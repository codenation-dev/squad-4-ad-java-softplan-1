package com.example.spring1.Log.dto;

import com.example.spring1.Client.dto.ClientShortDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogListDTO {

  Long id;
  String logLevel;
  String code;
  String message;
  String details;
  String createdAt;

  ClientShortDTO client;

}