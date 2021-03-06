package com.example.spring1.User;

import com.example.spring1._Common.MapperService;
import com.example.spring1.Client.Client;
import com.example.spring1.Client.ClientRepository;
import com.example.spring1.User.dto.UserCreateInsecureDTO;
import com.example.spring1.User.dto.UserDetailDTO;
import com.example.spring1.User.dto.UserListDTO;
import com.example.spring1.User.dto.UserPatchDTO;
import java.util.function.Function;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final ClientRepository clientRepository;
  private final MapperService modelMapperService;
  private final PasswordEncoder passwordEncoder;

  UserDetailDTO getUser(Long id) {
    User user = userRepository.getOne(id);
    ModelMapper mapper = modelMapperService.getMapper();
    return mapper.map(user, UserDetailDTO.class);
  }

  List<UserListDTO> listUsers() {
    List<User> found = userRepository.findAll();
    ModelMapper mapper = modelMapperService.getMapper();
    Function<User, UserListDTO> mapperFn =
      user -> {
        return mapper.map(user, UserListDTO.class);
      };
    List<UserListDTO> out = found.stream().map(mapperFn).collect(Collectors.toList());
    return out;
  }

  void patchUser(User _user, UserPatchDTO input) {
    User user = userRepository.getOne(_user.getId());
    if (input.getClients() != null) {
      List<Client> clients = clientRepository.findAllById(input.getClients());
      user.setClients(clients);
    }
    if (input.getDisplayName() != null && input.getDisplayName().length() > 0) {
      user.setDisplayName(input.getDisplayName());
    }
    if (input.getPassword() != null && input.getPassword().length() > 0) {
      String encoded = passwordEncoder.encode(input.getPassword());
      user.setPassword(encoded);
    }
    userRepository.save(user);
  }

  UserDetailDTO createUserInsecure(UserCreateInsecureDTO input) {
    User user = modelMapperService.getMapper().map(input, User.class);
    user.setPassword(passwordEncoder.encode(input.getPassword()));
    user = userRepository.save(user);
    return modelMapperService.getMapper().map(user, UserDetailDTO.class);
  }
}
