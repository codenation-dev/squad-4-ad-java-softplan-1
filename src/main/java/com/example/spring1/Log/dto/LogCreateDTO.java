package com.example.spring1.Log.dto;

import com.example.spring1.Log.LogLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogCreateDTO {

    private LogLevel logLevel;
    private String code;
    private String message;
    private String details;

}
