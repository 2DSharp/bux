package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Organization.OrgRoleDto;
import me.twodee.bux.DTO.Organization.OrganizationCreation;
import me.twodee.bux.Model.Entity.Organization;
import me.twodee.bux.Model.Entity.OrganizationMember;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.OrganizationMemberRepository;
import me.twodee.bux.Model.Repository.OrganizationRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrganizationService {

    private final OrganizationMemberRepository memberRepository;
    private final OrganizationRepository repository;
    private final SpringHelperDependencyProvider helper;

    @Autowired
    public OrganizationService(OrganizationRepository repository,
                               OrganizationMemberRepository memberRepository,
                               SpringHelperDependencyProvider helper) {
        this.repository = repository;
        this.memberRepository = memberRepository;
        this.helper = helper;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void createOrg(OrganizationCreation dto, User user) {
        // Check for uniqueness
        if (repository.existsByName(dto.getName())) {
            return;
        }
        var org = Organization.builder().name(dto.getName()).build();
        org = repository.save(org);
        OrganizationMember member = OrganizationMember.builder().organization(org)
                .role(OrganizationMember.Role.OWNER)
                .user(user)
                .build();
        memberRepository.save(member);
    }

    public boolean hasAdminAccess(String orgId, User user) {
        var org = repository.findByName(orgId);
        var member = memberRepository.findByOrganizationAndUser(org, user);
        return member.getRole().level >= OrganizationMember.Role.ADMIN.level;
    }

    public void addToOrg(OrgRoleDto dto, User user) {
        var org = repository.findByName(dto.getOrgName());
        var modifier = memberRepository.findByOrganizationAndUser(org, user);

        OrganizationMember member = OrganizationMember.builder()
                .organization(org)
                .role(dto.getRole())
                .user(new User(dto.getTarget().getId()))
                .assignedBy(user)
                .build();
        if (canChangeRoles(modifier, member)) {
            memberRepository.save(member);
            return;
        }
        permRoleNotify(dto);
    }

    public void updateMemberRole(OrgRoleDto dto, User user) {
        var org = repository.findByName(dto.getOrgName());
        var modifier = memberRepository.findByOrganizationAndUser(org, user);
        var target = memberRepository.findByOrganizationAndUser(org, new User(dto.getTarget().getUsername()));
        if (canChangeRoles(modifier, target)) {
            target.setRole(dto.getRole());
            return;
        }
        permRoleNotify(dto);
    }
    private void permRoleNotify(DataTransferObject dto) {
        var note = new Notification();
        note.addError(new Error("permission", helper.getMessageByLocaleService().getMessage("validation.organization.role")));
        dto.setNotification(note);
    }
    private boolean canChangeRoles(OrganizationMember modifier, OrganizationMember target) {
        switch (modifier.getRole()) {
            case OWNER:
                return true;
            case ADMIN:
                return (target.getRole().level <= OrganizationMember.Role.ADMIN.level);
        }
        return false;
    }
}
