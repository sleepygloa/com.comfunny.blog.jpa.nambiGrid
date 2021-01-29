package com.comfunny.blog.system.session;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public class SessionResponseDto {

    private String userName;
    private String userEmail;
    private String userRole;
    private String userPicture;


    public SessionResponseDto(String userName, String userEmail, String userRole, String userPicture) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.userPicture = userPicture;
    }
}
