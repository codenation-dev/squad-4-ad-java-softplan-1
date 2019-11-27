package com.example.spring1.Collectors;

import com.example.spring1.Collectors.dto.SubmitLogDTO;
import com.example.spring1.Log.Log;
import com.example.spring1.Log.LogService;
import com.example.spring1.Log.dto.LogListDTO;
import com.example.spring1._Common.MapperService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

/**
 * API pública de envio de log
 */
@RestController
@RequestMapping("/collectors")
@AllArgsConstructor
public class CollectorsController {
  private final LogService logService;
  private final MapperService mapper;

  @PostMapping("/submit-log")
  LogListDTO submitLog(@RequestBody SubmitLogDTO body) {
    Log toCreate = mapper.getMapper().map(body.getLog(), Log.class);
    String apiToken = body.getApiToken();
    Log created = this.logService.submit(apiToken, toCreate);
    return mapper.getMapper().map(created, LogListDTO.class);
  }
}
