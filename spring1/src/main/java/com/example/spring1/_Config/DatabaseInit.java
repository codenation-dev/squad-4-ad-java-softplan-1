package com.example.spring1._Config;

import com.example.spring1.User.User;
import com.example.spring1.User.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInit implements ApplicationRunner {
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public DatabaseInit(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		User found = userRepository.getByUsername("adm");
		if (found == null) {
			User toCreate = new User();
			toCreate.setDisplayName("Administrador");
			toCreate.setEmail("adm@adm.com");
			toCreate.setUsername("adm");
			toCreate.setPassword(passwordEncoder.encode("123456"));
			userRepository.save(toCreate);
		}
	}
}
