package com.comfunny.blog.system.menu.service;


import com.comfunny.blog.posts.domain.Posts;
import com.comfunny.blog.posts.dto.PostsSaveRequestDto;
import com.comfunny.blog.posts.dto.PostsUpdateRequestDto;
import com.comfunny.blog.system.menu.domain.Menu;
import com.comfunny.blog.system.menu.domain.MenuRepository;
import com.comfunny.blog.system.menu.dto.MenuListResponseDto;
import com.comfunny.blog.system.menu.dto.MenuSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenuService {

    private final MenuRepository menuRepository;

    @Transactional(readOnly = true)
    public List<MenuListResponseDto> findAlldesc(){
        return menuRepository.findAllDesc().stream()
                .map(MenuListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void save(List<MenuSaveRequestDto> list){
        System.out.println(list.toString());
        for(MenuSaveRequestDto dto : list){
            System.out.println(dto.toString());
            String flag = (String)dto.getFlag();
            System.out.println(flag);
            if(flag.equals("I")){
                menuRepository.save(dto.toEntity()).getMenuSeq();
            }else if(flag.equals("U") || flag.equals("D")){
                Menu menu = menuRepository.findById(dto.getMenuSeq())
                        .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq()));

                menu.Update(dto.getMenuParentSeq(), dto.getMenuLev(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());

            }else{

                new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
            }

        }
    }


}
