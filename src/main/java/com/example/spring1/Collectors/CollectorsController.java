package com.example.spring1.Collectors;

import com.example.spring1.Collectors.dto.SubmitLogDTO;
import com.example.spring1.Log.dto.LogCreatedDTO;
import com.example.spring1.Log.Log;
import com.example.spring1.Log.LogService;
import com.example.spring1._Common.MapperService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
  LogCreatedDTO submitLog(@RequestBody SubmitLogDTO body) {
    Log toCreate = mapper.getMapper().map(body.getLog(), Log.class);
    String apiToken = body.getApiToken();
    Long id = this.logService.submit(apiToken, toCreate);
    LogCreatedDTO out = new LogCreatedDTO();
    out.setId(id);
    return out;
  }
}
