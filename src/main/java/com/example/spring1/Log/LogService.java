package com.example.spring1.Log;

import com.example.spring1.Client.Client;
import com.example.spring1.Client.ClientRepository;
import com.example.spring1.Log.dto.LogListDTO;
import com.example.spring1.User.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.function.Function;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LogService {
  private final LogRepository logRepository;
  private final ClientRepository clientRepository;

  Predicate contextFilter(User user) {
    return QLog.log.client.users.contains(user);
  }

  Page<LogListDTO> listLogs(User user, Pageable pageable, LogFilterParams filter) {
    // aplicar filtros
    Predicate base = contextFilter(user);
    QLog qLog = QLog.log;
    BooleanBuilder builder = new BooleanBuilder();
    builder = builder.and(base);
    if (filter.clientId != null) {
      builder = builder.and(qLog.client.id.eq(filter.clientId));
    }
    if (filter.code != null) {
      builder = builder.and(qLog.code.like(filter.code));
    }
    if (filter.logLevel != null) {
      builder = builder.and(qLog.logLevel.eq(filter.logLevel));
    }
    if (filter.createdAt_gt != null) {
      builder = builder.and(qLog.createdAt.gt(filter.createdAt_gt));
    }
    if (filter.createdAt_lt != null) {
      builder = builder.and(qLog.createdAt.lt(filter.createdAt_lt));
    }
    Page<Log> page = logRepository.findAll(builder, pageable);

    // mapear
    ModelMapper modelMapper = new ModelMapper();

    // JAVA TENTANDO TER FP KKKKKKKKKKKKKKKKKKKKk
    Function<Log, LogListDTO> mapper = log -> {
      return modelMapper.map(log, LogListDTO.class);
    };
    Page<LogListDTO> out = page.map(mapper);
    return out;
  }

  public Log submit(String clientToken, Log log) {
    Client foundClient = clientRepository.findByapiToken(clientToken);
    if (foundClient == null) {
      throw new RuntimeException("Cliente inválido");
    }
    log.setId(null);
    log.setClient(foundClient);
    log = logRepository.save(log);
    return log;
  }
}
