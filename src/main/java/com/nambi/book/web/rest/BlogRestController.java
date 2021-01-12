package com.nambi.book.web.rest;

import com.nambi.book.service.blog.BlogService;
import com.nambi.book.web.dto.blog.*;
import com.nambi.book.web.dto.post.PostsSaveRequestDto;
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
    @GetMapping("/blog/list")
    public List<BlogListResponseDto> list(){
        return blogService.findAlldesc();
    }

    /***************************************
     * 글 저장
     ***************************************/
    @PostMapping("/blog/save")
    public void save(@RequestBody Map map){
        blogService.save((List<Map<String, Object>>)map.get("list"));
    }

    /***************************************
     * 글삭제
     ***************************************/
    @DeleteMapping("/blog/delete")
    public void deleteMaster(@RequestParam int idx){
        blogService.deleteMaster(idx);
    }

    /***************************************
     * 글 상세보기
     ***************************************/
    @GetMapping("/blog/view")
    public List<BlogDetailListResponseDto> findById(@RequestParam int idx){
        return blogService.findById(idx);
    }

    /***************************************
     * 댓글 리스트 조회
     ***************************************/
    @GetMapping("/blog/listRe")
    public List<BlogReListResponseDto> listRe(@RequestParam int idx){
        return blogService.findDesc(idx);
    }

    /***************************************
     * 댓글 저장
     ***************************************/
    @PostMapping("/blog/saveRe")
    public void saveRe(@RequestBody Map data){ blogService.saveRe(data); }

    /***************************************
     * 댓글 삭제
     ***************************************/
    @DeleteMapping("/blog/deleteRe")
    public void deleteRe(@RequestBody Map data){ blogService.deleteRe(data); }

}
