package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.Organization.OrganizationCreation;
import me.twodee.bux.Model.Entity.Organization;
import me.twodee.bux.Model.Entity.OrganizationMember;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.OrganizationMemberRepository;
import me.twodee.bux.Model.Repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrganizationService {

    private final OrganizationMemberRepository memberRepository;
    private final OrganizationRepository repository;

    @Autowired
    public OrganizationService(OrganizationRepository repository, OrganizationMemberRepository memberRepository) {
        this.repository = repository;
        this.memberRepository = memberRepository;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void createOrg(OrganizationCreation dto, User user) {
        Organization org = Organization.builder().name(dto.getName()).build();
        org = repository.save(org);
        OrganizationMember member = new OrganizationMember(org, user, OrganizationMember.Role.OWNER);
        memberRepository.save(member);
    }
}
