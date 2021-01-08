package com.nambi.book.web.rest;

import com.nambi.book.service.blog.BlogService;
import com.nambi.book.web.dto.blog.BlogListResponseDto;
import com.nambi.book.web.dto.blog.BlogSaveRequestDto;
import com.nambi.book.web.dto.post.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class BlogRestController {

    private final BlogService blogService;

    @GetMapping("/blog/list")
    public List<BlogListResponseDto> list(){
        return blogService.findAlldesc();
    }

    @PostMapping("/blog/save")
    public void save(@RequestBody Map map){
        blogService.save((List<Map<String, Object>>)map.get("list"));

    }
}
