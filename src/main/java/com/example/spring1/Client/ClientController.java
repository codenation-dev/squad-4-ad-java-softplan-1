package com.example.spring1.Client;

import com.example.spring1.User.User;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
public class ClientController {
  private ClientService clientService;

  @GetMapping
  List<Client> listClients(Authentication auth) {
    return this.clientService.list(auth);
  }
}
