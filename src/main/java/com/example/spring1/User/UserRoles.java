package com.example.spring1.User;

public enum UserRoles {
  ROLE_ADMIN("ROLE_ADMIN"), ROLE_USER("ROLE_USER");
  private String identifier;

  UserRoles(String identifier) {
    this.identifier = identifier;
  }

  @Override
  public String toString() {
    return this.identifier;
  }
}
