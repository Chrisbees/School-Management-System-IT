package com.chrisbees.management.services;


import com.chrisbees.management.domain.Backlog;
import com.chrisbees.management.domain.Project;
import com.chrisbees.management.domain.User;
import com.chrisbees.management.exceptions.ProjectIdException;
import com.chrisbees.management.exceptions.ProjectNotFoundException;
import com.chrisbees.management.repositories.BacklogRepository;
import com.chrisbees.management.repositories.ProjectRepository;
import com.chrisbees.management.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project projects, String username) {

        if (projects.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(projects.getProjectIdentifier());
            if (existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException("Project not found in your account");
            } else if (!existingProject.getId().equals(projects.getId())) {
                throw new ProjectNotFoundException("Project with ID: '" + projects.getProjectIdentifier() + "' cannot be updated because it does not exists");
            }
        }
        try {

            User user = userRepository.findByUsername(username);
            projects.setUser(user);
            projects.setProjectLeader(user.getUsername());
            projects.setProjectIdentifier(projects.getProjectIdentifier().toUpperCase());
            if (projects.getId() == null) {
                Backlog backlog = new Backlog();
                projects.setBacklog(backlog);
                backlog.setProject(projects);
                backlog.setProjectIdentifier(projects.getProjectIdentifier().toUpperCase());
            }

            if (projects.getId() != null) {
                projects.setBacklog(backlogRepository.findByProjectIdentifier(projects.getProjectIdentifier().toUpperCase()));
            }
            return projectRepository.save(projects);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID " + projects.getProjectIdentifier().toUpperCase() + " already exists");
        }

    }

    public Project findProjectByIdentifier(String projectId, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("ProjectID does not exists");
        }

        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectById(String projectId, String username) {

        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }

    public Project updateProjectById(String projectId, Project newProject) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID " + projectId + " does not exists");
        }
        project.setProjectName(newProject.getProjectName());
        project.setDescription(newProject.getDescription());
        return projectRepository.save(newProject);
    }
}
