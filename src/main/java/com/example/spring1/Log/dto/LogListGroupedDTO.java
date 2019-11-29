package com.example.spring1.Log.dto;

import com.example.spring1.Client.dto.ClientShortDTO;
import com.example.spring1.Log.LogLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogListGroupedDTO {
  Long count;
  LogLevel logLevel;
  String code;
  String message;

  ClientShortDTO client;

  Integer day;
  Integer month;
  Integer year;
}
