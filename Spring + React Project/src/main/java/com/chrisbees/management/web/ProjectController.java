package com.chrisbees.management.web;

import com.chrisbees.management.domain.Project;
import com.chrisbees.management.services.MapValidationErrorService;
import com.chrisbees.management.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Validated @RequestBody Project projects, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        projectService.saveOrUpdateProject(projects);
        return new ResponseEntity<Project>(projects, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId) {
        Project project = projectService.findProjectByIdentifier(projectId);
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects() {
        return projectService.findAllProjects();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable String projectId) {
        projectService.deleteProjectById(projectId);
        return new ResponseEntity<String>("Project with ID " + projectId + " was deleted", HttpStatus.OK);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateUserById(@RequestBody Project project, @PathVariable String projectId) {
        projectService.updateProjectById(projectId, project);
        return new ResponseEntity<String>("Project with ID " + projectId + " successfully Updated", HttpStatus.OK);
    }

}
