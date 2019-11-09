package com.example.spring1.LogGroup;

import com.example.spring1.Log.Log;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
public class LogGroup {

    private Long id;

    @OneToMany
    private List<Log> logs;

    private Log head;

}
