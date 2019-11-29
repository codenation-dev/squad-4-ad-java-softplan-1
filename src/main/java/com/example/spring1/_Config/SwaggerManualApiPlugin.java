package com.example.spring1._Config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import springfox.documentation.builders.OperationBuilder;
import springfox.documentation.service.ApiDescription;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.ApiListingScannerPlugin;
import springfox.documentation.spi.service.contexts.DocumentationContext;
import springfox.documentation.spring.web.readers.operation.CachingOperationNameGenerator;

@SuppressWarnings({ "WhitespaceAround", "ParenPad" })
public class SwaggerManualApiPlugin implements ApiListingScannerPlugin {
  @Autowired
  private CachingOperationNameGenerator operationNames;

  @Override
  public List<ApiDescription> apply(DocumentationContext context) {
    Set<String> tags = new HashSet<>();
    tags.add("auth");
    return new ArrayList<>(
      Arrays.asList( //<1>
        new ApiDescription(
          "getOauthToken",
          "/oauth/token",
          "Get oauth token",
          Collections.singletonList( //<2>
            new OperationBuilder(operationNames)
              .authorizations(new ArrayList<>())
              .codegenMethodNameStem("getOauthToken") //<3>
              .method(HttpMethod.POST)
              .tags(tags)
              .summary("oauthPostToken")
              .notes(
                "Autenticar segundo o padrão OAuth2 usando o fluxo \"Resource Owner Password Credentials\"."
              )
              // .parameters(
              //     Collections.singletonList( //<4>
              //         new ParameterBuilder()
              //             .description("search by description")
              //             .type(new TypeResolver().resolve(String.class))
              //             .name("description")
              //             .parameterType("query")
              //             .parameterAccess("access")
              //             .required(true)
              //             .modelRef(new ModelRef("string")) //<5>
              //             .build()))
              // .responseMessages(responseMessages()) //<6>
              // .responseModel(new ModelRef("string")) //<7>
              .build()
          ),
          false
        )
      )
    );
  }

  @Override
  public boolean supports(DocumentationType delimiter) {
    return DocumentationType.SWAGGER_2.equals(delimiter);
  }
}
