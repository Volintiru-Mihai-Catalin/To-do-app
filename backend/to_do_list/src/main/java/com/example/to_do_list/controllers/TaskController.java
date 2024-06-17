package com.example.to_do_list.controllers;

import com.example.to_do_list.dto.TaskDTO;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return taskService.getTasks();
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id) {
        return taskService.deleteTask(id);
    }
}
