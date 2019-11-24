package com.example.spring1.Collectors;

import com.example.spring1.Log.dto.LogCreatedDTO;
import com.example.spring1.Log.Log;
import com.example.spring1.Log.LogService;
import com.example.spring1.User.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/collectors")
@AllArgsConstructor
public class CollectorsController {
  private final LogService logService;

  @PostMapping("/submit-log")
  LogCreatedDTO submitLog(
    @RequestBody Log log,
    @RequestParam String apiToken,
    Authentication auth
  ) {
    User user = (User) auth.getPrincipal();
    Long id = this.logService.submit(apiToken, user, log);

    LogCreatedDTO out = new LogCreatedDTO();
    out.setId(id);
    return out;
  }
}
