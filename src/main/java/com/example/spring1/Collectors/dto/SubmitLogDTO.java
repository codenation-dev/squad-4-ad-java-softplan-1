package com.example.spring1.Collectors.dto;

import com.example.spring1.Log.dto.LogCreateDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitLogDTO {

    private String apiToken;
    private LogCreateDTO log;

}
