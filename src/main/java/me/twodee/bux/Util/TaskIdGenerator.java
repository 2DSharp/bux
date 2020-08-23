package me.twodee.bux.Util;

import lombok.extern.slf4j.Slf4j;
import me.twodee.bux.Model.Entity.Task;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.LongType;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.sql.*;
import java.util.Properties;

@Slf4j
public class TaskIdGenerator extends SequenceStyleGenerator {
    private static final String KEYSPACE = "project_";
    @Override
    public Serializable generate(SharedSessionContractImplementor session,
                                 Object object) throws HibernateException {
        String projectKey = ((Task) object).getProject().getId().getProjectKey();

        try {
            long lastId = getLastId(session, projectKey);
            return String.format("%s-%s", projectKey, lastId);
        } catch (SQLException e) {
            log.error("Couldn't get the sequence, something's broken", e);
            return null;
        }
    }

    private Long getLastId(SharedSessionContractImplementor session, String projectKey) throws SQLException {
        Connection connection = session.connection();
        Dialect dialect = session.getJdbcServices().getDialect();

        if (dialect.supportsSequences()) {
            return generateIdUsingSequences(dialect, connection, projectKey);
        }
        return generateIdWithSeparateTable(connection, projectKey);
    }

    private Long generateIdWithSeparateTable(Connection connection, String projectKey) throws SQLException {
        connection.setAutoCommit(false);
        connection.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);

        try {
            PreparedStatement fetchStmt = connection.prepareStatement("SELECT Val + 1 FROM Sequence WHERE SeqKey = ?");
            fetchStmt.setString(1, KEYSPACE + projectKey);
            ResultSet resultSet = fetchStmt.executeQuery();
            resultSet.next();

            long value = resultSet.getLong(1);

            PreparedStatement updateStatement = connection.prepareStatement(
                    "UPDATE Sequence SET Val = Val + 1 WHERE SeqKey = ?");
            updateStatement.setString(1, KEYSPACE + projectKey);
            updateStatement.executeUpdate();
            connection.commit();
            return value;

        } catch (SQLException e) {
            Statement creation = connection.createStatement();
            creation.executeUpdate(
                    "CREATE TABLE IF NOT EXISTS Sequence (SeqKey VARCHAR(30) PRIMARY KEY, Val INTEGER DEFAULT 0)");

            PreparedStatement insert = connection.prepareStatement("INSERT INTO Sequence(SeqKey) VALUES (?)");
            insert.setString(1, KEYSPACE + projectKey);
            insert.executeUpdate();

            return generateIdWithSeparateTable(connection, projectKey);
        }
    }

    private Long generateIdUsingSequences(Dialect dialect, Connection connection, String projectKey) throws SQLException {
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(
                    dialect.getSequenceNextValString(KEYSPACE + projectKey));
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            return resultSet.getLong(1);

        } catch (SQLException e) {
            // The Sequence doesn't exist, create and retry
            Statement statement = connection.createStatement();
            connection.setAutoCommit(false);
            for (String command : dialect.getCreateSequenceStrings(KEYSPACE + projectKey, 1, 1)) {
                statement.addBatch(command);
            }
            statement.executeBatch();
            connection.commit();
            return generateIdUsingSequences(dialect, connection, projectKey);
        }
    }

    @Override
    public void configure(Type type, Properties params,
                          ServiceRegistry serviceRegistry) throws MappingException {
        super.configure(LongType.INSTANCE, params, serviceRegistry);
    }
}