package com.example.spring1.Log;

import com.example.spring1._Common.MapperService;
import com.example.spring1.Client.Client;
import com.example.spring1.Client.ClientService;
import com.example.spring1.Log.dto.LogListDTO;
import com.example.spring1.Log.dto.LogListGroupedDTO;
import com.example.spring1.User.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.LiteralExpression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.function.Function;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LogService {
  private final LogRepository logRepository;
  private final ClientService clientService;
  private final MapperService modelMapperService;

  List<Object> sortPaths;

  @PersistenceContext
  EntityManager em;

  Predicate contextFilter(User user) {
    return QLog.log.client.users.contains(user);
  }

  private BooleanBuilder getFilters(User user, LogFilterParams filter) {
    Predicate base = contextFilter(user);
    QLog qLog = QLog.log;
    BooleanBuilder builder = new BooleanBuilder();
    builder = builder.and(base);
    if (filter.clientId != null) {
      builder = builder.and(qLog.client.id.eq(filter.clientId));
    }
    if (filter.code != null && filter.code.length() >= 2) {
      builder = builder.and(qLog.code.like("%" + filter.code + "%"));
    }
    if (filter.message != null && filter.message.length() >= 2) {
      builder = builder.and(qLog.message.like("%" + filter.message + "%"));
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
    if (filter.day != null) {
      builder = builder.and(qLog.createdAt.dayOfMonth().eq(filter.day));
    }
    if (filter.month != null) {
      builder = builder.and(qLog.createdAt.month().eq(filter.month));
    }
    if (filter.year != null) {
      builder = builder.and(qLog.createdAt.year().eq(filter.year));
    }
    return builder;
  }

  private void applySort(JPAQuery<?> query, Pageable pageable) {
    QLog l = QLog.log;
    pageable
      .getSort()
      .forEach(
        sort -> {
          if (sort.getProperty().equals("createdAt")) {
            if (!sort.isAscending()) {
              query.orderBy(
                l.createdAt.year().asc(),
                l.createdAt.month().asc(),
                l.createdAt.dayOfMonth().asc()
              );
            } else {
              query.orderBy(
                l.createdAt.year().desc(),
                l.createdAt.month().desc(),
                l.createdAt.dayOfMonth().desc()
              );
            }
          }

          if (sort.getProperty().equals("count")) {
            if (!sort.isAscending()) {
              query.orderBy(l.id.count().asc());
            } else {
              query.orderBy(l.id.count().desc());
            }
          }

          this.sortPaths.forEach(
              path -> {
                PathMetadata meta = ((Path<?>) path).getMetadata();
                if (sort.getProperty().equals(meta.getElement())) {
                  if (sort.isAscending()) {
                    OrderSpecifier<?> order = (((LiteralExpression<?>) path).asc());
                    query.orderBy(order);
                  } else if (sort.isDescending()) {
                    OrderSpecifier<?> order = (((LiteralExpression<?>) path).desc());
                    query.orderBy(order);
                  }
                }
              }
            );
        }
      );
  }

  Optional<LogListDTO> getLog(Long id) {
    Optional<Log> found = this.logRepository.findById(id);
    ModelMapper mapper = modelMapperService.getMapper();
    return found.map(log -> mapper.map(log, LogListDTO.class));
  }

  Page<LogListDTO> listLogs(User user, Pageable pageable, LogFilterParams filter) {
    BooleanBuilder qdslFilter = this.getFilters(user, filter);
    Page<Log> page = logRepository.findAll(qdslFilter, pageable);
    ModelMapper modelMapper = modelMapperService.getMapper();
    Function<Log, LogListDTO> mapper =
      log -> {
        return modelMapper.map(log, LogListDTO.class);
      };
    Page<LogListDTO> out = page.map(mapper);
    return out;
  }

  List<LogListGroupedDTO> listLogsGrouped(User user, Pageable pageable, LogFilterParams filter) {
    BooleanBuilder qdslFilters = this.getFilters(user, filter);
    QLog l = QLog.log;
    JPAQueryFactory queryFactory = new JPAQueryFactory(em);
    JPAQuery<Tuple> query = queryFactory
      .from(l)
      .groupBy(
        l.client.id,
        l.logLevel,
        l.code,
        l.message,
        l.createdAt.dayOfMonth(),
        l.createdAt.month(),
        l.createdAt.year()
      )
      .where(qdslFilters)
      .limit(500)
      .select(
        l.id.count(),
        l.logLevel,
        l.code,
        l.message,
        l.createdAt.dayOfMonth(),
        l.createdAt.month(),
        l.createdAt.year(),
        l.client.id
      );
    applySort(query, pageable);

    List<Tuple> result = query.fetch();
    List<LogListGroupedDTO> out = result
      .stream()
      .map(
        line -> {
          LogListGroupedDTO group = new LogListGroupedDTO();
          group.setCount(line.get(0, Long.class));
          group.setLogLevel(line.get(1, LogLevel.class));
          group.setCode(line.get(2, String.class));
          group.setMessage(line.get(3, String.class));
          group.setDay(line.get(4, Integer.class));
          group.setMonth(line.get(5, Integer.class));
          group.setYear(line.get(6, Integer.class));
          Long clientId = line.get(7, Long.class);

          // suponhamos que exista cache de consultas
          group.setClient(clientService.getShortById(clientId));
          return group;
        }
      )
      .collect(Collectors.toList());

    return out;
  }

  public Log submit(String clientToken, Log log) {
    Client foundClient = this.clientService.getByApiToken(clientToken);
    if (foundClient == null) {
      throw new RuntimeException("Cliente inválido");
    }
    log.setId(null);
    log.setClient(foundClient);
    log = logRepository.save(log);
    return log;
  }

  public LogService(
    LogRepository logRepository,
    ClientService clientService,
    MapperService modelMapperService
  ) {
    this.logRepository = logRepository;
    this.clientService = clientService;
    this.modelMapperService = modelMapperService;

    QLog l = QLog.log;
    List<Object> paths = new ArrayList<Object>();
    paths.add(l.logLevel);
    paths.add(l.code);
    paths.add(l.message);
    this.sortPaths = paths;
  }
}
