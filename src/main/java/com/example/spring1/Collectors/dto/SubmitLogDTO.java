package com.example.spring1.Collectors.dto;

import com.example.spring1.Log.dto.LogCreateDTO;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitLogDTO {
  @NotNull
  private String apiToken;

  @NotNull
  private LogCreateDTO log;
}
