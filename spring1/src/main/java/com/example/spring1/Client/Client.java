package com.example.spring1.Client;

import com.example.spring1.User.User;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

public class Client {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String apiToken;

    @ManyToMany
    private List<User> users;

}
