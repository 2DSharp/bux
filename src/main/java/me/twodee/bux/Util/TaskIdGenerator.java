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

    @Override
    public Serializable generate(SharedSessionContractImplementor session,
                                 Object object) throws HibernateException {
        String projectKey = ((Task) object).getProject().getProjectKey();

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
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(
                    dialect.getSequenceNextValString("project_" + projectKey));
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            return resultSet.getLong(1);

        } catch (SQLException e) {
            Statement statement = connection.createStatement();
            connection.setAutoCommit(false);
            for (String command : dialect.getCreateSequenceStrings("project_" + projectKey, 1, 1)) {
                statement.addBatch(command);
            }
            statement.executeBatch();
            connection.commit();
            return getLastId(session, projectKey);
        }
    }

    @Override
    public void configure(Type type, Properties params,
                          ServiceRegistry serviceRegistry) throws MappingException {
        super.configure(LongType.INSTANCE, params, serviceRegistry);
    }
}