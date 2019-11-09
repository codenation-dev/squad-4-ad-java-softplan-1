package com.example.spring1.Auth;

import com.example.spring1.User.User;
import com.example.spring1.User.UserDTO;
import com.example.spring1.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfigAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    public void authenticationManager(AuthenticationManagerBuilder builder, UserRepository usuarioRepository) throws Exception {
        if (usuarioRepository.count() == 0) {
            User usuario = new User();
            usuario.setUsername("admin");
            usuario.setPassword("admin");
            usuarioRepository.save(usuario);
        }

        builder.userDetailsService(login -> new UserDTO(usuarioRepository.findByLogin(login)));
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManagerBean();
    }
}
