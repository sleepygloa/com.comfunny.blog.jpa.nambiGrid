package com.comfunny.blog.blog.controller;

import com.comfunny.blog.blog.dto.Post;
import com.comfunny.blog.config.auth.LoginUser;
import com.comfunny.blog.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class BlogController {

    /************************************************************
     * 블로그 페이지로 이동
     *************************************************************/
    @GetMapping("/b")
    public String blog(Model model, @LoginUser SessionUser user){
        if(user != null){
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail", user.getEmail());
        }

        return "blog/blog";
    }

    @GetMapping("/b/blog/md")
    public String md(Model model){
        return "blog/blogMd";
    }

    /***************************************
     * 글 폼 불러오기
     ***************************************/
    @GetMapping("/b/blog/mdView")
    public String mdView(Model model){
        return "blog/blogMdView";
    }

    /***************************************
     * 글 폼 불러오기
     ***************************************/
    @GetMapping("/b/blog/mdUpdate")
    public String mdUpdate(Model model){
        return "blog/blogMd";
    }

    @PostMapping("")
    public String save(Post post, Model model) {
        post.setHtml(markdownToHTML(post.getContent()));
        model.addAttribute("post", post);
        return "blog/saved";
    }

    private String markdownToHTML(String markdown) {
        Parser parser = Parser.builder()
                .build();

        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder()
                .build();
        System.out.println(renderer.render(document));
        return renderer.render(document);
    }
}
