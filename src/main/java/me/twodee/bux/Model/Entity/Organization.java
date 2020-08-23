package me.twodee.bux.Model.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Organization {

    @Id
    private String name;

    private String description;

    private String imageUrl;

    private final LocalDateTime createdAt = LocalDateTime.now();

    public Organization(String name) {
        this.name = name;
    }
}
