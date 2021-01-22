package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.Blog;
import com.comfunny.blog.blog.domain.BlogCategory;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BlogListCategoryResponseDto {

    private Long idx;
    private String categoryA;
    private String categoryB;
    private String categoryC;

    public BlogListCategoryResponseDto(BlogCategory entity){
        this.idx = entity.getIdx();
        this.categoryA = entity.getCategoryA();
        this.categoryB = entity.getCategoryB();
        this.categoryC = entity.getCategoryC();
    }

}
