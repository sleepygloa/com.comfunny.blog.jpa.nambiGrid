package com.comfunny.blog.system.session;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class SessionDto {

    @Id
    @Column
    private  int id;

    @Column
    private  String name;

    @Column
    private  String email;

    @Column
    private  String role;

    @Builder
    public SessionDto(int id, String name, String email, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
