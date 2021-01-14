package com.comfunny.blog.web.rest;

import com.comfunny.blog.service.system.MenuService;
import com.comfunny.blog.web.dto.system.MenuListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/menu/list")
    public List<MenuListResponseDto> menuList(){
        return menuService.findAlldesc();
    }
}
