package com.example.spring1.Client;

import com.example.spring1.User.User;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Entity
public class Client {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String apiToken;

    @ManyToMany(mappedBy = "clients")
    private List<User> users;

}
