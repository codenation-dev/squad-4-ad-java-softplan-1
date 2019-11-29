package com.example.spring1.Log;

import com.example.spring1._Common.Exceptions.NotFoundException;
import com.example.spring1.Log.dto.LogListDTO;
import com.example.spring1.Log.dto.LogListGroupedDTO;
import com.example.spring1.User.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/logs")
@Api(description = "API privada de consulta de logs consumida pela interface de Admin.")
public class LogController {
  private final LogService logService;

  @GetMapping("/{id}")
  LogListDTO getLog(@PathVariable Long id) {
    return logService.getLog(id).orElseThrow(() -> new NotFoundException("Não encontrado."));
  }

  @GetMapping
  Page<LogListDTO> listLogs(
    @RequestParam(required = false) Long clientId,
    @RequestParam(required = false) LogLevel logLevel,
    @RequestParam(required = false) String code,
    @RequestParam(required = false) LocalDateTime createdAt_gt,
    @RequestParam(required = false) LocalDateTime createdAt_lt,
    @RequestParam(required = false) Integer day,
    @RequestParam(required = false) Integer month,
    @RequestParam(required = false) Integer year,
    @RequestParam(required = false) String message,
    Authentication auth,
    Pageable pageable
  ) {
    LogFilterParams params = new LogFilterParams();
    params.clientId = clientId;
    params.logLevel = logLevel;
    params.code = code;
    params.message = message;
    params.createdAt_gt = createdAt_gt;
    params.createdAt_lt = createdAt_lt;
    params.day = day;
    params.month = month;
    params.year = year;
    User user = (User) auth.getPrincipal();
    return logService.listLogs(user, pageable, params);
  }

  @ApiOperation(value = "listLogsGrouped", notes = "Agrupa por código, mensagem e dia.")
  @GetMapping("/grouped")
  List<LogListGroupedDTO> listLogsGrouped(
    @RequestParam(required = false) Long clientId,
    @RequestParam(required = false) LogLevel logLevel,
    @RequestParam(required = false) String code,
    @RequestParam(required = false) LocalDateTime createdAt_gt,
    @RequestParam(required = false) LocalDateTime createdAt_lt,
    @RequestParam(required = false) String message,
    Authentication auth,
    Pageable pageable
  ) {
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
