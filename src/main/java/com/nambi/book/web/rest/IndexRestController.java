package com.nambi.book.web.rest;

import com.nambi.book.config.auth.LoginUser;
import com.nambi.book.config.auth.dto.SessionUser;
import com.nambi.book.service.system.MenuService;
import com.nambi.book.web.dto.IndexSessionResponseDto;
import com.nambi.book.web.dto.blog.BlogListResponseDto;
import com.nambi.book.web.dto.system.MenuListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class IndexRestController {


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
