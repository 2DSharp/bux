package me.twodee.bux.Controller;

import me.twodee.bux.DTO.Project.ProjectDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
public class ProjectController
{
    @GetMapping("/projects")
    public List<ProjectDTO> projects()
    {
        return new ArrayList<>();
    }

}
