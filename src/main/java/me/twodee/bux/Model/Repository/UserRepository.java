package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>
{
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);

    @Override
    <S extends User> S save(S s);
}
