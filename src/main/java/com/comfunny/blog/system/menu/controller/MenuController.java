package com.comfunny.blog.system.menu.controller;

import com.comfunny.blog.blog.dto.Post;
import lombok.RequiredArgsConstructor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class MenuController {

    /************************************************************
     * 메뉴 페이지로 이동
     *************************************************************/
    @GetMapping("/b/menu")
    public String menu(Model model){
        return "system/menu/menu";
    }

}
