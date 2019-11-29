package com.example.spring1.User.dto;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateInsecureDTO {
  @NotBlank
  String username;

  @NotBlank
  String displayName;

  @NotBlank
  String email;

  @NotBlank
  String password;
}
