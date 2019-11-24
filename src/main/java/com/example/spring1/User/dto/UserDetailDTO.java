package com.example.spring1.User.dto;

import com.example.spring1.Client.dto.ClientDetailDTO;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailDTO {
  Long id;
  String username;
  String email;
  String displayName;
  List<ClientDetailDTO> clients;
}
