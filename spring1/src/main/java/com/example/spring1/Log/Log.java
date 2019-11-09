package com.example.spring1.Log;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.Index;

import com.example.spring1.User.User;

@Data
@Entity
public class Log {

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
    private User user;
}