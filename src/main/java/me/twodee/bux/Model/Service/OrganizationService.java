package me.twodee.bux.Model.Service;

import me.twodee.bux.Component.DtoFilter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.ListDto;
import me.twodee.bux.DTO.Organization.OrgRoleDto;
import me.twodee.bux.DTO.Organization.OrganizationCreation;
import me.twodee.bux.DTO.Organization.TeamDto;
import me.twodee.bux.DTO.Organization.TeamInvitationDto;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Model.Entity.Invitation;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static me.twodee.bux.Util.CryptoUtil.generateId;

@Service
public class OrganizationService {

    private final OrganizationMemberRepository memberRepository;
    private final OrganizationRepository repository;
    private final SpringHelperDependencyProvider helper;
    private final InvitationService invitationService;

    @Autowired
    public OrganizationService(OrganizationRepository repository,
                               OrganizationMemberRepository memberRepository,
                               SpringHelperDependencyProvider helper, InvitationService invitationService) {
        this.repository = repository;
        this.memberRepository = memberRepository;
        this.helper = helper;
        this.invitationService = invitationService;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void createOrg(OrganizationCreation dto, User user) {

        var note = checkForErrors(dto);
        if (note.hasErrors()) {
            dto.setNotification(note);
            return;
        }
        var org = Organization.builder().name(dto.getName()).description(dto.getDescription()).build();
        org = repository.save(org);
        OrganizationMember member = OrganizationMember.builder().organization(org)
                .role(OrganizationMember.Role.OWNER)
                .user(user)
                .build();
        memberRepository.save(member);
    }

    private Notification checkForErrors(OrganizationCreation dto) {
        return DtoFilter.start(dto)
                .validate(helper.getValidator())
                .addFilter(e -> !repository.existsByName(e.getName()), new Error("name",
                        helper.getMessageByLocaleService().getMessage("validation.team.name.exists"))).getNotification();
    }

    public boolean hasAdminAccess(Organization team, User user) {
        if (team == null)
            return false;
        var member = memberRepository.findByOrganizationAndUser(team, user);
        if (member.isEmpty())
            return false;
        return member.get().getRole().level >= OrganizationMember.Role.ADMIN.level;
    }

    public boolean hasAdminAccess(String orgId, User user) {
        var org = repository.findByName(orgId);
        if (org.isEmpty())
            return false;
        var member = memberRepository.findByOrganizationAndUser(org.get(), user);
        if (member.isEmpty())
            return false;
        return member.get().getRole().level >= OrganizationMember.Role.ADMIN.level;
    }

    private Organization findTeam(String name, DataTransferObject dto) {
        var org = repository.findByName(name);
        if (org.isEmpty()) {
            nonexistentTeamNotify(dto);
            return null;
        }
        return org.get();
    }

    private OrganizationMember findMember(Organization team, User user, DataTransferObject dto) {
        var member = memberRepository.findByOrganizationAndUser(team, user);
        if (member.isEmpty()) {
            nonexistentTeamNotify(dto);
            return null;
        }
        return member.get();
    }

    public void addToOrg(OrgRoleDto dto, User user) {
        var org = findTeam(dto.getOrgName(), dto);
        if (org == null)
            return;
        var modifier = findMember(org, user, dto);
        if (modifier == null)
            return;
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

    public Optional<Organization> getOrg(String name) {
        return repository.findByName(name);
    }

    public void updateMemberRole(OrgRoleDto dto, User user) {
        var org = findTeam(dto.getOrgName(), dto);
        if (org == null)
            return;
        var modifier = findMember(org, user, dto);

        var target = findMember(org, new User(dto.getTarget().getUsername()), dto);
        if (modifier == null || target == null)
            return;
        if (canChangeRoles(modifier, target)) {
            target.setRole(dto.getRole());
            return;
        }
        permRoleNotify(dto);
    }

    private void permRoleNotify(DataTransferObject dto) {
        var note = NotificationFactory.createErrorNotification("permission", helper.getMessageByLocaleService().getMessage("validation.organization.role"));
        dto.setNotification(note);
    }

    private void nonexistentTeamNotify(DataTransferObject dto) {
        var note = NotificationFactory.createErrorNotification("global", helper.getMessageByLocaleService().getMessage("validation.team.nonexistent"));
        dto.setNotification(note);
    }

    private void nonexistentMemberNotify(DataTransferObject dto) {
        var note = NotificationFactory.createErrorNotification("global", helper.getMessageByLocaleService().getMessage("validation.team.member.nonexistent"));
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

    public ListDto<TeamDto> getTeamsForUser(User user) {
        var memberForEachOrg = memberRepository.findDistinctByUser(user);
        List<TeamDto> resultList = memberForEachOrg.stream().map(e -> createTeamDto(e.getOrganization())).collect(Collectors.toList());
        return new ListDto<>(resultList);
    }

    public TeamDto createTeamDto(Organization team) {
        return TeamDto.builder()
                .name(team.getName())
                .description(team.getDescription())
                .image(team.getImageUrl())
                .build();
    }

    public boolean canSeeProjects(String teamId, User user) {
        var member = memberRepository.findByOrganizationAndUser(new Organization(teamId), user);
        if (member.isEmpty())
            return false;
        return (member.get().getRole().level >= OrganizationMember.Role.READ.level);
    }

    public void inviteMember(User user, String teamId, TeamInvitationDto dto) {

        if (!hasAdminAccess(teamId, user)) {
            dto.setNotification(NotificationFactory.createErrorNotification("permission", helper.getMessageByLocaleService().getMessage("validation.organization.role")));
            return;
        }
        Organization team = new Organization(teamId);
        List<Invitation> invitations = dto.getEmails().stream()
                .map(email -> createInvitation(email, user, team))
                .collect(Collectors.toList());

        invitationService.sendInvitation(invitations);
    }

    private Invitation createInvitation(String email, User user, Organization org) {
        return Invitation.builder()
                .email(email)
                .organization(org)
                .invitedBy(user)
                .build();
    }
}
