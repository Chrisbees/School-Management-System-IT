package com.chrisbees.management.services;


import com.chrisbees.management.domain.Project;
import com.chrisbees.management.exceptions.ProjectIdException;
import com.chrisbees.management.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project projects){
        try {
            projects.setProjectIdentifier(projects.getProjectIdentifier().toUpperCase());
            return projectRepository.save(projects);
        }catch (Exception e){
            throw new ProjectIdException("Project ID" + projects.getProjectIdentifier().toUpperCase() + " already exists");
        }

    }

    public Project findProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
           throw new ProjectIdException("ProjectID does not exists");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectById(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null){
            throw new ProjectIdException("Project ID " + projectId + " does not exists");
        }
        projectRepository.delete(project);
    }

    public Project updateProjectById(String projectId, Project newProject){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null){
            throw new ProjectIdException("Project ID " + projectId + " does not exists");
        }
        project.setProjectName(newProject.getProjectName());
        project.setDescription(newProject.getDescription());
        return projectRepository.save(newProject);
    }
}
