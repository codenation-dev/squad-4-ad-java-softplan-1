package com.example.spring1.Collectors;

import com.example.spring1.Log.dto.LogCreatedDTO;
import com.example.spring1.Log.Log;
import com.example.spring1.Log.LogService;
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

  @PostMapping("/submit-log")
  LogCreatedDTO submitLog(@RequestBody Log log, @RequestParam String apiToken) {
    Long id = this.logService.submit(apiToken, log);

    LogCreatedDTO out = new LogCreatedDTO();
    out.setId(id);
    return out;
  }
}
