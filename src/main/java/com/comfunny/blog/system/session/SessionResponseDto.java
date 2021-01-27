package com.comfunny.blog.system.session;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public class SessionResponseDto {

    private  String userName;
    private  String userEmail;
    private  String userRole;


    public SessionResponseDto(String userName, String userEmail, String userRole) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userRole = userRole;
    }
}
