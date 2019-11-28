package com.example.spring1.Log;

import java.time.LocalDateTime;

public class LogFilterParams {
  public Long clientId;
  public LogLevel logLevel;
  public String code;
  public String message;
  public LocalDateTime createdAt_gt;
  public LocalDateTime createdAt_lt;
}
