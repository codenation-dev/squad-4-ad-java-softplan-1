package com.example.spring1.Log;

import java.time.LocalDateTime;
import java.util.List;

import com.example.spring1.Log.dto.LogListDTO;
import com.example.spring1.Log.dto.LogListGroupedDTO;
import com.example.spring1.User.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/logs")
public class LogController {
  private final LogService logService;

  @GetMapping
  Page<LogListDTO> listLogs(@RequestParam(required = false) Long clientId,
      @RequestParam(required = false) LogLevel logLevel, @RequestParam(required = false) String code,
      @RequestParam(required = false) LocalDateTime createdAt_gt,
      @RequestParam(required = false) LocalDateTime createdAt_lt, @RequestParam(required = false) String message,
      Authentication auth, Pageable pageable) {
    LogFilterParams params = new LogFilterParams();
    params.clientId = clientId;
    params.logLevel = logLevel;
    params.code = code;
    params.message = message;
    params.createdAt_gt = createdAt_gt;
    params.createdAt_lt = createdAt_lt;
    User user = (User) auth.getPrincipal();
    return logService.listLogs(user, pageable, params);
  }

  @GetMapping("/grouped")
  List<LogListGroupedDTO> listLogsGrouped(@RequestParam(required = false) Long clientId,
      @RequestParam(required = false) LogLevel logLevel, @RequestParam(required = false) String code,
      @RequestParam(required = false) LocalDateTime createdAt_gt,
      @RequestParam(required = false) LocalDateTime createdAt_lt, @RequestParam(required = false) String message,
      Authentication auth, Pageable pageable) {
    LogFilterParams params = new LogFilterParams();
    params.clientId = clientId;
    params.logLevel = logLevel;
    params.code = code;
    params.message = message;
    params.createdAt_gt = createdAt_gt;
    params.createdAt_lt = createdAt_lt;
    User user = (User) auth.getPrincipal();
    return logService.listLogsGrouped(user, pageable, params);
  }
}
