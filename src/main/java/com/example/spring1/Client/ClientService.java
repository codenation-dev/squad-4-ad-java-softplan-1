package com.example.spring1.Client;

import com.example.spring1._Common.MapperService;
import com.example.spring1.Client.dto.ClientCreateDTO;
import com.example.spring1.Client.dto.ClientDetailDTO;
import com.example.spring1.Client.dto.ClientShortDTO;
import com.example.spring1.User.User;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientService {
  private final ClientRepository clientRepository;
  private final MapperService mapperService;

  ClientDetailDTO create(ClientCreateDTO client) {
    Client toCreate = new Client();
    toCreate.setName(client.getName());
    toCreate.setApiToken(UUID.randomUUID().toString());
    Client model = clientRepository.save(toCreate);
    return mapperService.getMapper().map(model, ClientDetailDTO.class);
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

  List<ClientDetailDTO> list(User user) {
    ModelMapper mapper = mapperService.getMapper();
    List<Client> clients = this.clientRepository.findByUsers_Id(user.getId());
    return clients
      .stream()
      .map(
        client -> {
          return mapper.map(client, ClientDetailDTO.class);
        }
      )
      .collect(Collectors.toList());
  }

  public ClientShortDTO getShortById(Long id) {
    Client client = clientRepository.getOne(id);
    return this.mapperService.getMapper().map(client, ClientShortDTO.class);
  }

  public Client getByApiToken(String apiToken) {
    return clientRepository.findByapiToken(apiToken);
  }

  Boolean userHasAccess(Long userId, Long clientId) {
    List<Client> found = clientRepository.getByIdAndUsersId(clientId, userId);
    return found.size() > 0;
  }
}
