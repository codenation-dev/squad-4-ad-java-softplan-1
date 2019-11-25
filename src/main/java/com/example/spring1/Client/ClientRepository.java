package com.example.spring1.Client;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
  List<Client> findByUsers_Id(Long userId);
  Client findByapiToken(String apiToken);
}
