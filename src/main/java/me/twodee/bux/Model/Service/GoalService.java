package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Model.Entity.Goal;
import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.GoalRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;

public class GoalService {

    private final ProjectManagement projectManagement;
    private final GoalRepository repository;
    private final SpringHelperDependencyProvider provider;

    public GoalService(ProjectManagement projectManagement,
                       GoalRepository repository, SpringHelperDependencyProvider provider) {
        this.projectManagement = projectManagement;
        this.repository = repository;
        this.provider = provider;
    }

    public void createGoal(GoalCreationDTO dto, User user) {
        if (!projectManagement.projectExists(dto.getProjectKey())) {
            dto.appendNotification(NotificationFactory.createErrorNotification("global",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.nonexistent")));
            return;
        }

        Project project = projectManagement.getProjectReferenceFromKey(dto.getProjectKey());
        Goal goal = Goal.builder()
                .title(dto.getTitle())
                .priority(dto.getPriority())
                .deadline(dto.getDeadline())
                .createdBy(user)
                .project(project)
                .milestone(dto.getMilestone())
                .build();

        ServiceHelper.safeSaveToRepository(repository, goal, () -> dto.setNotification(
                NotificationFactory.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
    }
}
