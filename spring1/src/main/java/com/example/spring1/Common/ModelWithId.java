package com.example.spring1.Common;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
public class ModelWithId<IdType> {

    @Id
    @GeneratedValue
    protected IdType id;

}
