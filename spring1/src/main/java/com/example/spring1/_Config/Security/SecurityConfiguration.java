package com.example.spring1._Config.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final TokenProvider tokenProvider;
  private final CorsFilter corsFilter;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    // @formatter:off
      http
          .csrf()
          .disable()
          .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
          .exceptionHandling()
          // .authenticationEntryPoint(problemSupport)
          // .accessDeniedHandler(problemSupport)
      .and()
          .headers()
          .contentSecurityPolicy("default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:")
      .and()
          .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
      .and()
          .featurePolicy("geolocation 'none'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; fullscreen 'self'; payment 'none'")
      .and()
          .frameOptions()
          .deny()
      .and()
          .sessionManagement()
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
          .authorizeRequests()
          .antMatchers("/api/authenticate").permitAll()
          .antMatchers("/api/register").permitAll()
          .antMatchers("/api/activate").permitAll()
          .antMatchers("/api/account/reset-password/init").permitAll()
          .antMatchers("/api/account/reset-password/finish").permitAll()
          .antMatchers("/api/**").authenticated()
          .antMatchers("/management/health").permitAll()
          .antMatchers("/management/info").permitAll()
          .antMatchers("/management/prometheus").permitAll()
          .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
      .and()
          .httpBasic()
      .and()
          .apply(securityConfigurerAdapter());
      // @formatter:on
  }

  private JWTConfigurer securityConfigurerAdapter() {
    return new JWTConfigurer(tokenProvider);
  }

  public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter) {
    this.tokenProvider = tokenProvider;
    this.corsFilter = corsFilter;
  }

}
