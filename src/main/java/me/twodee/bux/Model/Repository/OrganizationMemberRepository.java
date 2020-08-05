package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.OrganizationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, Integer> {
}
