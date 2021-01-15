package com.comfunny.blog.system.menu.controller;

import com.comfunny.blog.posts.dto.PostsSaveRequestDto;
import com.comfunny.blog.posts.dto.PostsUpdateRequestDto;
import com.comfunny.blog.system.menu.dto.MenuSaveRequestDto;
import com.comfunny.blog.system.menu.service.MenuService;
import com.comfunny.blog.system.menu.dto.MenuListResponseDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/i/menu/list")
    public List<MenuListResponseDto> menuList(){
        return menuService.findAlldesc();
    }

    @PostMapping("/i/menu/saveRow")
    public void save(@RequestBody Map map){

        ObjectMapper mapper = new ObjectMapper();
        List<MenuSaveRequestDto> list =  mapper.convertValue((List<MenuSaveRequestDto>)map.get("list"), new TypeReference<List<MenuSaveRequestDto>>() {});

        menuService.save(list);
    }

}
