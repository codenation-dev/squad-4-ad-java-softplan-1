package com.example.spring1.User;

import com.example.spring1.User.dto.UserCreateInsecureDTO;
import com.example.spring1.User.dto.UserDetailDTO;
import com.example.spring1.User.dto.UserPatchDTO;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Api(description = "Informações e operações de usuário.", tags = { "users" })
public class UserController {
  private final UserService userService;

  // fixme: permissões devem ser limitadas
  // @GetMapping
  // List<UserListDTO> list() {
  //   return userService.listUsers();
  // }
  @GetMapping("/self")
  UserDetailDTO self(Authentication auth) {
    User user = (User) auth.getPrincipal();
    return userService.getUser(user.getId());
  }

  @PatchMapping("/self")
  void patchUserSelf(@RequestBody UserPatchDTO body, Authentication auth) {
    User user = (User) auth.getPrincipal();
    userService.patchUser(user, body);
  }

  @PostMapping("/public")
  UserDetailDTO createUserInsecure(@RequestBody UserCreateInsecureDTO input) {
    return userService.createUserInsecure(input);
  }
}
