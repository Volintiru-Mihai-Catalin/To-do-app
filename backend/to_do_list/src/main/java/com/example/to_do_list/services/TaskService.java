package com.example.to_do_list.services;

import com.example.to_do_list.dto.TaskDTO;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public ResponseEntity<List<TaskDTO>> getTasks() {
        List<Task> tasks = taskRepository.findAll();

        return new ResponseEntity<>(tasks.stream().map(task -> TaskDTO
                .builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .state(task.getState().toString())
                .date(new SimpleDateFormat("yyyy-MM-dd").format(task.getDate()))
                .build()).toList(), HttpStatus.OK);
    }

    public ResponseEntity<Task> addTask(Task task) {
        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
    }

    public ResponseEntity<?> updateTask(Task task) {
        Optional<Task> taskOptional = taskRepository.findById(task.getId());
        if (taskOptional.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Task taskToUpdate = taskOptional.get();
        taskToUpdate.setTitle(task.getTitle());
        taskToUpdate.setDescription(task.getDescription());
        taskToUpdate.setState(task.getState());
        taskToUpdate.setDate(task.getDate());

        return new ResponseEntity<>(taskRepository.save(taskToUpdate), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteTask(Integer id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        taskRepository.delete(taskOptional.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
