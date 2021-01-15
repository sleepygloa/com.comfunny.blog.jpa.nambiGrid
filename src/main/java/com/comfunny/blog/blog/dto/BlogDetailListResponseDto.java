package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.BlogDetail;
import lombok.Getter;

@Getter
public class BlogDetailListResponseDto {

    private Long idx;

    private String categoryA;
    private String categoryB;
    private String categoryC;
    private String title;

    private Long i;

    private String content;
    private String type;
    private String imgWidthScale;

    public BlogDetailListResponseDto(BlogDetail entity){
        this.idx = entity.getIdx();
        this.categoryA = entity.getCategoryA();
        this.categoryB = entity.getCategoryB();
        this.categoryC = entity.getCategoryC();
        this.title = entity.getTitle();
        this.i = entity.getI();
        this.content = entity.getContent();
        this.type = entity.getType();
        this.imgWidthScale = entity.getImgWidthScale();
    }

}
