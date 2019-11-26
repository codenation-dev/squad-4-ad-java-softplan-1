package com.example.spring1.Client;

import com.example.spring1.Client.dto.ClientCreateDTO;
import com.example.spring1.Client.dto.ClientShortDTO;
import com.example.spring1.User.User;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/clients")
public class ClientController {
  private ClientService clientService;

  @GetMapping
  List<ClientShortDTO> listClients(Authentication auth) {
    User user = (User) auth.getPrincipal();
    return this.clientService.list(user);
  }

  @PostMapping
  Client createClient(@RequestBody ClientCreateDTO client) {
    return clientService.create(client);
  }
}
