package com.example.spring1.Log;

import java.util.List;

import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LogService {

  private final LogRepository repository;

  public static Specification<Log> fromClient(LogFilterParams params) {
    return (root, query, builder) -> {
      if (params.clientId != null) {
        builder.equal(root.get("client"), params.clientId);
      }
      return builder.get;
    }
  }

  List<Log> listLogs(LogFilterParams filter) {
    
  }

}