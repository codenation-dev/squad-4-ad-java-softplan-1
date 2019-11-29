package com.example.spring1._Config;

import java.util.ArrayList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.ApiListingScannerPlugin;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger {

  @Bean
  public ApiListingScannerPlugin listingScanner() {
    return new SwaggerManualApiPlugin();
  }

  @Bean
  public Docket mainApi() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.example.spring1"))
      .paths(PathSelectors.any())
      .build()
      .apiInfo(apiInfo())
      .useDefaultResponseMessages(false);
  }

  private ApiInfo apiInfo() {
    return new ApiInfo(
      "Aceleralog",
      "Serviço coletor de logs. [aceleralog.now.sh](https://aceleralog.now.sh/)",
      "1.0.0",
      null,
      null,
      null,
      null,
      new ArrayList<>()
    );
  }
}
