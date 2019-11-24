package com.example.spring1.User;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  public User getByUsername(String username);
  public Optional<User> getByEmail(String email);
}
