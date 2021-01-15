package com.comfunny.blog.blog.controller;

import com.comfunny.blog.blog.service.BlogService;
import com.comfunny.blog.blog.dto.BlogDetailListResponseDto;
import com.comfunny.blog.blog.dto.BlogListResponseDto;
import com.comfunny.blog.blog.dto.BlogReListResponseDto;
import lombok.RequiredArgsConstructor;
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


    /***************************************
     * 글 저장 (md)
     ***************************************/
    @PostMapping("/i/blog/saveMd")
    public void saveMd(@RequestParam int idx, @RequestParam String title, @RequestParam String content, @RequestParam String url){
        blogService.saveMd(idx, title, content, url);
    }

}
