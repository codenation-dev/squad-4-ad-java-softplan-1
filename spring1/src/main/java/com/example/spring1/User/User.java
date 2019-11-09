package com.example.spring1.User;

import javax.persistence.*;

import com.example.spring1.Client.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
public class User {

  @Id
  @GeneratedValue
  private Long id;

  private String username;
  private String displayName;
  private String passwordHash;

  @ManyToMany
  @JoinTable(joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id"))
  private List<Client> clients;
}
