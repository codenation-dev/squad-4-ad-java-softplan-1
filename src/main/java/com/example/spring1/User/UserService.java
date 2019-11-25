package com.example.spring1.User;

import com.example.spring1.Client.Client;
import com.example.spring1.Client.ClientRepository;
import com.example.spring1.User.dto.UserDetailDTO;
import com.example.spring1.User.dto.UserListDTO;
import com.example.spring1.User.dto.UserPatchDTO;
import java.util.function.Function;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final ClientRepository clientRepository;

  UserDetailDTO getUser(Long id) {
    User user = userRepository.getOne(id);
    ModelMapper mapper = new ModelMapper();
    return mapper.map(user, UserDetailDTO.class);
  }

  List<UserListDTO> listUsers() {
    List<User> found = userRepository.findAll();
    ModelMapper mapper = new ModelMapper();
    Function<User, UserListDTO> mapperFn =
      user -> {
        return mapper.map(user, UserListDTO.class);
      };
    List<UserListDTO> out = found
      .stream()
      .map(mapperFn)
      .collect(Collectors.toList());
    return out;
  }

  void patchUser(User user, UserPatchDTO input) {
    if (input.getClients() != null) {
      List<Client> clients = clientRepository.findAllById(input.getClients());
      user.setClients(clients);
    }
    if (input.getDisplayName() != null) {
      user.setDisplayName(input.getDisplayName());
    }
    userRepository.save(user);
  }
}
