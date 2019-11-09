package com.example.spring1.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.example.spring1.Client.Client;
import lombok.Data;

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
  private List<Client> clients;

}