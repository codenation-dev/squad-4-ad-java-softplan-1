package com.example.spring1.Client;

import com.example.spring1.User.User;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientService {
  private final ClientRepository clientRepository;

  Client create(Client client) {
    client.setApiToken(UUID.randomUUID().toString());
    return clientRepository.save(client);
  }

  Client patch(Client client) {
    Client existing = clientRepository.getOne(client.getId());
    existing.setName(client.getName());
    return clientRepository.save(existing);
  }

  void remove(Long clientId) {
    clientRepository.deleteById(clientId);
  }

  String resetApiToken(Long clientId) {
    Client found = clientRepository.getOne(clientId);
    if (found == null) {
      throw new RuntimeException("Client not found");
    }
    String generated = UUID.randomUUID().toString();
    found.setApiToken(generated);
    clientRepository.save(found);
    return generated;
  }

  List<Client> list(Authentication auth) {
    User user = (User) auth.getPrincipal();
    return this.clientRepository.findByUsers_Id(user.getId());
  }
}
