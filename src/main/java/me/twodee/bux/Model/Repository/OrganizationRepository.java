package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, String> {
    Optional<Organization> findByName(String org);
    boolean existsByName(String name);
}
