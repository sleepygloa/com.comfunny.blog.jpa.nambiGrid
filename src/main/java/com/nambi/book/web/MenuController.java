package com.nambi.book.web;

import com.nambi.book.config.auth.LoginUser;
import com.nambi.book.config.auth.dto.SessionUser;
import com.nambi.book.service.system.MenuService;
import com.nambi.book.web.dto.system.MenuListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MenuController {

    private final MenuService menuService;



    @GetMapping("/menu/list")
    public List<MenuListResponseDto> menuList(){
        return menuService.findAlldesc();
    }
}
