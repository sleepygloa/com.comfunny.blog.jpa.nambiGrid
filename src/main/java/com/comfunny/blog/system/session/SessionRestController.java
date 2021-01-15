package com.comfunny.blog.system.session;

import com.comfunny.blog.system.session.IndexSessionResponseDto;
import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class SessionRestController {


    @GetMapping("/session")
    public IndexSessionResponseDto list(Model model, @LoginUser SessionUser user){
        String userName = "";
        String userEmail = "";

        if(user != null){
            userName = user.getName();
            userEmail = user.getEmail();
        }

        return new IndexSessionResponseDto(userName, userEmail);
    }
}
