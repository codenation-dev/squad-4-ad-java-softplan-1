package com.example.spring1.Log;

import com.example.spring1.Client.Client;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

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

    @CreatedDate
    Date createdAt;

    @ManyToOne
    private Client client;
}
