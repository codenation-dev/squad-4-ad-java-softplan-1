package com.example.spring1.Client;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

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

}
