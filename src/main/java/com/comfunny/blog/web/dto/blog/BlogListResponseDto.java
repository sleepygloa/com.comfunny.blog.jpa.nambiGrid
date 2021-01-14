package com.comfunny.blog.web.dto.blog;

import com.comfunny.blog.domain.blog.Blog;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BlogListResponseDto {

    private Long idx;
    private Long pIdx;

    private String categoryA;
    private String categoryB;
    private String categoryC;
    private String hashIndex;
    private String subject;
    private String useYn;
    private String delYn;
    private String inUserId;
    private String upUserId;

    private LocalDateTime inDt;
    private LocalDateTime upDt;

    public BlogListResponseDto(Blog entity){
        this.idx = entity.getIdx();
        this.pIdx = entity.getPIdx();
        this.categoryA = entity.getCategoryA();
        this.categoryB = entity.getCategoryB();
        this.categoryC = entity.getCategoryC();
        this.hashIndex = entity.getHashIndex();
        this.subject = entity.getSubject();
        this.useYn = entity.getUseYn();
        this.delYn = entity.getDelYn();
        this.inUserId = entity.getInUserId();
        this.upUserId = entity.getUpUserId();
        this.inDt = entity.getInDt();
        this.upDt = entity.getUpDt();
    }

}
