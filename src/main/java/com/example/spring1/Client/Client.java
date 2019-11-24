package com.example.spring1.Client;

import com.example.spring1.User.User;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(indexes = { @Index(columnList = "apiToken") })
public class Client {
  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true)
  private String name;

  private String apiToken;

  @ManyToMany(mappedBy = "clients")
  private List<User> users;
}
