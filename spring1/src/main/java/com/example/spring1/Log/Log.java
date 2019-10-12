package com.example.spring1.Log;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class Log {

  private @Id
  @GeneratedValue
  Long id;

  @Enumerated(EnumType.STRING)
  private LogLevel logLevel;

  private String code;
  private String message;

  Log() {
  }

  public Log(LogLevel logLevel, String code, String message) {
    this.logLevel = logLevel;
    this.code = code;
    this.message = message;
  }

}