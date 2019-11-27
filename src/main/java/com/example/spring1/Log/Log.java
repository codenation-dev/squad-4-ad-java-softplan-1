package com.example.spring1.Log;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.example.spring1.Client.Client;
import com.example.spring1._Common.ModelWithAuditTimestamps;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Log extends ModelWithAuditTimestamps {

    @Id
    @GeneratedValue
    private Long id;

    // fixme index this
    @Enumerated(EnumType.STRING)
    private LogLevel logLevel;
    // fixme: index this
    private String code;
    // fixme: index this
    private String message;
    // fixme: index this
    private String details;

    @ManyToOne
    private Client client;
}
