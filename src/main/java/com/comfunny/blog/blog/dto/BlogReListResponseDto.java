package com.comfunny.blog.blog.dto;

import com.comfunny.blog.blog.domain.BlogRe;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BlogReListResponseDto {

    private Long idx;
    private Long ref;
    private Long pRef;
    private Long level;

    private String content;
    private String delYn;
    private String inUserId;
    private String upUserId;
    private String inUserEmail;
    private String upUserEmail;
    private String picture;

    private LocalDateTime inDt;
    private LocalDateTime upDt;

    public BlogReListResponseDto(BlogRe entity){
        this.idx = entity.getIdx();
        this.ref = entity.getRef();
        this.pRef = entity.getPRef();
        this.level = entity.getLevel();
        this.content = entity.getContent();
        this.delYn = entity.getDelYn();
        this.inUserId = entity.getInUserId();
        this.upUserId = entity.getUpUserId();
        this.inUserEmail = entity.getInUserEmail();
        this.upUserEmail = entity.getUpUserEmail();
        this.picture = entity.getPicture();
        this.inDt = entity.getInDt();
        this.upDt = entity.getUpDt();
    }

}
