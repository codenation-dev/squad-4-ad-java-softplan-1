package com.example.spring1.Log;

import com.example.spring1.Errors.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LogController {

  private final LogRepository repository;

  LogController(LogRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/logs")
  List<Log> all() {
    return repository.findAll();
  }

  @PostMapping("/logs")
  Log newLog(@RequestBody Log newLog) {
    return repository.save(newLog);
  }

  @GetMapping("/logs/{id}")
  Log retrieve(@PathVariable Long id) {
    return repository.findById(id).orElseThrow(NotFoundException::new);
  }

  @PutMapping("/logs/{id}")
  Log putLog(@RequestBody Log newLog, @PathVariable Long id) {
    return repository.findById(id)
      .map(log -> {
        log.setCode(newLog.getCode());
        log.setLogLevel(newLog.getLogLevel());
        log.setMessage(newLog.getMessage());
        return repository.save(log);
      })
      .orElseGet(() -> {
        newLog.setId(id);
        return repository.save(newLog);
      });
  }

  @DeleteMapping("/logs/{id}")
  void deleteLog(@PathVariable Long id) {
    repository.deleteById(id);
  }

}
