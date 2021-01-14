package com.comfunny.blog.web.dto.blog;

import com.comfunny.blog.domain.blog.BlogDetail;
import lombok.Getter;

@Getter
public class BlogDetailListResponseDto {

    private Long idx;

    private String categoryA;
    private String categoryB;
    private String categoryC;
    private String subject;

    private Long i;

    private String content;
    private String type;
    private String imgWidthScale;

    public BlogDetailListResponseDto(BlogDetail entity){
        this.idx = entity.getIdx();
        this.categoryA = entity.getCategoryA();
        this.categoryB = entity.getCategoryB();
        this.categoryC = entity.getCategoryC();
        this.subject = entity.getSubject();
        this.i = entity.getI();
        this.content = entity.getContent();
        this.type = entity.getType();
        this.imgWidthScale = entity.getImgWidthScale();
    }

}
