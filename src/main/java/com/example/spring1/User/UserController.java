package com.example.spring1.User;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
	private final UserRepository userRepository;

	@GetMapping
	List<User> list() {
		return userRepository.findAll();
	}

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
