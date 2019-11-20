package com.example.spring1.User;

import com.example.spring1.Client.Client;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;

@Data
@Entity
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Long id;

  @Size(min = 3, max = 30)
  @Column(unique = true)
  @NotBlank
  private String username;

  @NotBlank
  @Email
  @Column(unique = true)
  private String email;

  @NotBlank
  @Size(min = 3, max = 30)
  private String displayName;

  @NotBlank
  private String password;

  @ManyToMany
  @JoinTable(joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "client_id"))
  private List<Client> clients;

}
