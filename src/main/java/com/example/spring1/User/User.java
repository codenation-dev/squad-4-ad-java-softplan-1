package com.example.spring1.User;

import com.example.spring1.Client.Client;
import com.example.spring1._Common.ModelWithAuditTimestamps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "appuser") // treta com o Postgres
public class User extends ModelWithAuditTimestamps implements UserDetails {
  /**
   *
   */
  private static final long serialVersionUID = 1859017184358810277L;

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

  // @ElementCollection
  // private Set<String> roles;
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> list = new ArrayList<>();

    // for (String r : roles) {
    // list.add(new SimpleGrantedAuthority(r));
    // }
    list.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
    return list;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
