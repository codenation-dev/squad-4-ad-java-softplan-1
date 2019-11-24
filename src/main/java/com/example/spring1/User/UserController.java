package com.example.spring1.User;

import com.example.spring1.User.dto.UserDetailDTO;
import com.example.spring1.User.dto.UserListDTO;
import com.example.spring1.User.dto.UserPatchDTO;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
  private final UserService userService;

  // fixme: permissões devem ser limitadas
  @GetMapping
  List<UserListDTO> list() {
    return userService.listUsers();
  }

  @GetMapping("/self")
  UserDetailDTO self(Principal principal) {
    User user = (User) principal;
    return userService.getUser(user);
  }

  @PatchMapping
  void patchUserSelf(@RequestBody UserPatchDTO body, Authentication auth) {
    User user = (User) auth.getPrincipal();
    userService.patchUser(user, body);
  }
}
