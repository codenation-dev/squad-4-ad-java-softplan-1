package com.example.spring1.Client;

import com.example.spring1._Common.ModelWithAuditTimestamps;
import com.example.spring1.User.User;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(indexes = { @Index(columnList = "apiToken") })
public class Client extends ModelWithAuditTimestamps {
  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true)
  @NotBlank
  private String name;

  private String apiToken;

  @ManyToMany(mappedBy = "clients")
  private List<User> users;
}
