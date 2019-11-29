package com.example.spring1.Log;

import com.example.spring1._Common.ModelWithAuditTimestamps;
import com.example.spring1.Client.Client;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(
  indexes = {
    @Index(columnList = "logLevel", unique = false),
    @Index(columnList = "code", unique = false),
    @Index(columnList = "message", unique = false),
  }
)
public class Log extends ModelWithAuditTimestamps {
  @Id
  @GeneratedValue
  private Long id;

  // fixme index this
  @NotNull
  @Enumerated(EnumType.STRING)
  private LogLevel logLevel;

  // fixme: index this
  @NotBlank
  private String code;

  // fixme: index this
  private String message;

  // fixme: index this
  private String details;

  @ManyToOne
  private Client client;
}
