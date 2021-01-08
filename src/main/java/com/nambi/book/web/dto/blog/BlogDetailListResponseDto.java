package com.nambi.book.web.dto.blog;

import com.nambi.book.domain.blog.Blog;
import com.nambi.book.domain.blog.BlogDetail;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BlogDetailListResponseDto {

    private Long idx;
    private Long i;

    private String content;
    private String type;
    private String imgWidthScale;

    public BlogDetailListResponseDto(BlogDetail entity){
        this.idx = entity.getIdx();
        this.i = entity.getI();
        this.content = entity.getContent();
        this.type = entity.getType();
        this.imgWidthScale = entity.getImgWidthScale();
    }

}
