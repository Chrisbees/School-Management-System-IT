package com.chrisbees.management.services;

import com.chrisbees.management.domain.Backlog;
import com.chrisbees.management.domain.ProjectTask;
import com.chrisbees.management.exceptions.ProjectNotFoundException;
import com.chrisbees.management.repositories.BacklogRepository;
import com.chrisbees.management.repositories.ProjectRepository;
import com.chrisbees.management.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.chrisbees.management.domain.Project;
import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        try {
            //PT to be added to a specific project, project != null, BL exists
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            //set the bl to the project task
            projectTask.setBacklog(backlog);

            // structure project sequence to be like this: IDPRO-1, IDPRO-2
            Integer BacklogSequence= backlog.getPTSequence();

            //Update the BL sequence
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);
            //Add sequence to project task
            projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);
            //INITIAL priority when priority is null
            if (projectTask.getPriority()==null){
                projectTask.setPriority(3);
            }
            //INITIAL status when status is null
            if (projectTask.getStatus()=="" || projectTask.getStatus()==null){
                projectTask.setStatus("TO_DO");
            }
            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }

    }

    public Iterable<ProjectTask> findBacklogById(String backlog_id) {

         Project project = projectRepository.findByProjectIdentifier(backlog_id);
         if (project==null){
             throw new ProjectNotFoundException("Project witht his ID '"+backlog_id+"' does not exists");
         }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id){
        //make sure we are searching the right sequence;
        return  projectTaskRepository.findByProjectSequence(pt_id);

    }
}
