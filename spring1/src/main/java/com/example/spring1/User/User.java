package com.example.spring1.User;

import com.example.spring1.Client.Client;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class User {

  @Id
  @GeneratedValue
  private Long id;

  private String username;
  private String displayName;
  private String password;

  @ManyToMany
  @JoinTable(joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id"))
  private List<Client> clients;
}
