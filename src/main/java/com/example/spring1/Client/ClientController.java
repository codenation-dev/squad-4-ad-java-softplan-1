package com.example.spring1.Client;

import com.example.spring1.Client.dto.ClientCreateDTO;
import com.example.spring1.Client.dto.ClientDetailDTO;
import com.example.spring1.Client.dto.ResetTokenDTO;
import com.example.spring1.User.User;
import io.swagger.annotations.Api;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/clients")
@Api(
  tags = { "clients" },
  description = "Cada aplicação distinta que consume o serviço de log é um Cliente.\nEx: Meu produto - dev, Meu produto - prod."
)
public class ClientController {
  private ClientService clientService;

  @GetMapping
  List<ClientDetailDTO> listClients(Authentication auth) {
    User user = (User) auth.getPrincipal();
    return this.clientService.list(user);
  }

  @PostMapping
  ClientDetailDTO createClient(@RequestBody ClientCreateDTO client) {
    return clientService.create(client);
  }

  @PostMapping("/reset-token")
  ResetTokenDTO resetToken(@RequestParam(required = true) Long clientId, Authentication auth) {
    User user = (User) auth.getPrincipal();
    if (!clientService.userHasAccess(user.getId(), clientId)) {
      throw new RuntimeException("Usuário não possui acesso a esse cliente.");
    }
    String newToken = clientService.resetApiToken(clientId);
    ResetTokenDTO out = new ResetTokenDTO();
    out.setApiToken(newToken);
    return out;
  }
}
