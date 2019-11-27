package com.example.spring1._Common;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@MappedSuperclass
public abstract class ModelWithAuditTimestamps {
	@CreationTimestamp
	@Column(updatable = false)
	protected LocalDateTime createdAt;

	@UpdateTimestamp
	protected LocalDateTime updatedAt;
}
