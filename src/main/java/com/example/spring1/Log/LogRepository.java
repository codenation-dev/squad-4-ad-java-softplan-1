package com.example.spring1.Log;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository
  extends JpaRepository<Log, Long>, QuerydslPredicateExecutor<Log> {}
