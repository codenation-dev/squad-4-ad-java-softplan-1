package com.example.spring1._Common;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class ModelWithId<IdType> {
	@Id
	@GeneratedValue
	protected IdType id;
}
