package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Organization;
import me.twodee.bux.Model.Entity.OrganizationMember;
import me.twodee.bux.Model.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, Integer> {
    Optional<OrganizationMember> findByOrganizationAndUser(Organization organization, User user);
}
