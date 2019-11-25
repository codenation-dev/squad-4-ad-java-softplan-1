package com.example.spring1._Common;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
  private ModelMapper modelMapper;

  MapperService() {
    this.modelMapper = new ModelMapper();
  }

  public ModelMapper getMapper() {
    return this.modelMapper;
  }
}
