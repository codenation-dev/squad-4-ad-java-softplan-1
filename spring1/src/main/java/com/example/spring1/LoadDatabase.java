package com.example.spring1;

import com.example.spring1.Log.Log;
import com.example.spring1.Log.LogLevel;
import com.example.spring1.Log.LogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(LogRepository repository) {
        return args -> {
            repository.save(new Log(LogLevel.DEBUG, "test", "test message"));
            repository.save(new Log(LogLevel.INFO, "test", "message2"));
        };
    }

}
