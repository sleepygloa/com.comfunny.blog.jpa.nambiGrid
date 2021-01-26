package com.comfunny.blog.system.menu.controller;

import com.comfunny.blog.system.menu.dto.MenuSaveRequestDto;
import com.comfunny.blog.system.menu.service.MenuService;
import com.comfunny.blog.system.menu.dto.MenuListResponseDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final MenuService menuService;

    @GetMapping("/b/menu/list")
    public List<MenuListResponseDto> list(@RequestParam(value="menuSeq", defaultValue = "-1") int menuSeq){

        if(menuSeq == -1){
            return menuService.findAlldesc();
        }else{
            return menuService.findAlldesc(menuSeq);
        }
    }


    @PostMapping("/b/menu/saveRow")
    public void save(@RequestBody Map map){

        ObjectMapper mapper = new ObjectMapper();
        List<MenuSaveRequestDto> list =  mapper.convertValue((List<MenuSaveRequestDto>)map.get("list"), new TypeReference<List<MenuSaveRequestDto>>() {});

        menuService.save(list);
    }


}
