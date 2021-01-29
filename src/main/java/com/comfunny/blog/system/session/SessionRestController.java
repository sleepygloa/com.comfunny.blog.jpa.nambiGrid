package com.comfunny.blog.system.session;

import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class SessionRestController {

    private final SessionRestService sessionRestService;

    @GetMapping("/session")
    public SessionResponseDto list(Model model, @LoginUser SessionUser user){
        String userName = "";
        String userEmail = "";
        String userRole = "";
        String userPicture = "";

        if(user != null){
            userName = user.getName();
            userEmail = user.getEmail();

            SessionDto dto  = sessionRestService.findByEmail(userEmail);
            userRole = dto.getRole();
            userPicture = dto.getPicture();

        }

        return new SessionResponseDto(userName, userEmail, userRole, userPicture);
    }
}
