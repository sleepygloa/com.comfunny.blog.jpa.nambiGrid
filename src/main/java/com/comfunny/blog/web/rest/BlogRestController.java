package com.comfunny.blog.web.rest;

import com.comfunny.blog.service.blog.BlogService;
import com.comfunny.blog.web.dto.blog.BlogDetailListResponseDto;
import com.comfunny.blog.web.dto.blog.BlogListResponseDto;
import com.comfunny.blog.web.dto.blog.BlogReListResponseDto;
import com.comfunny.blog.web.dto.blog.Post;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import lombok.RequiredArgsConstructor;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class BlogRestController {

    private final BlogService blogService;

    /***************************************
     * 블로그 리스트 조회
     ***************************************/
    @GetMapping("/i/blog/list")
    public List<BlogListResponseDto> list(){
        return blogService.findAlldesc();
    }

    /***************************************
     * 글 저장
     ***************************************/
    @PostMapping("/i/blog/save")
    public void save(@RequestBody Map map){
        blogService.save((List<Map<String, Object>>)map.get("list"));
    }

    /***************************************
     * 글삭제
     ***************************************/
    @DeleteMapping("/i/blog/delete")
    public void deleteMaster(@RequestParam int idx){
        blogService.deleteMaster(idx);
    }

    /***************************************
     * 글 상세보기
     ***************************************/
    @GetMapping("/i/blog/view")
    public List<BlogDetailListResponseDto> findById(@RequestParam int idx){
        return blogService.findById(idx);
    }

    /***************************************
     * 댓글 리스트 조회
     ***************************************/
    @GetMapping("/i/blog/listRe")
    public List<BlogReListResponseDto> listRe(@RequestParam int idx){
        return blogService.findDesc(idx);
    }

    /***************************************
     * 댓글 저장
     ***************************************/
    @PostMapping("/i/blog/saveRe")
    public void saveRe(@RequestBody Map data){ blogService.saveRe(data); }

    /***************************************
     * 댓글 삭제
     ***************************************/
    @DeleteMapping("/i/blog/deleteRe")
    public void deleteRe(@RequestBody Map data){ blogService.deleteRe(data); }




}
