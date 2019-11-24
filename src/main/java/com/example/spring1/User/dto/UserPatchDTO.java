package com.example.spring1.User.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPatchDTO {
  List<Long> clients;
  String displayName;
  String password;
}
