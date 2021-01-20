package com.comfunny.blog.blog.domain;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Blog extends BaseTimeEntity2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private Long pIdx;

    @Column(nullable = false)
    private String categoryA;

    @Column(nullable = false)
    private String categoryB;

    @Column(nullable = false)
    private String categoryC;


    @Column(nullable = false)
    private String title;


    @Column(nullable = false)
    private String useYn;

    @Column(nullable = false)
    private String delYn;

    @Column(nullable = false)
    private String inUserId;

    @Column(nullable = false)
    private String upUserId;

    @Column(nullable = false)
    private String githubUrl;

    @Column(nullable = false)
    private String markdownContent;

    @Builder
    public Blog(Long idx, Long pIdx, String categoryA, String categoryB, String categoryC, String title, String useYn, String delYn, String inUserId, String upUserId) {
        this.idx = idx;
        this.pIdx = pIdx;
        this.categoryA = categoryA;
        this.categoryB = categoryB;
        this.categoryC = categoryC;
        this.title = title;
        this.useYn = useYn;
        this.delYn = delYn;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
    }


//    public void update(Long idx, Long pIdx, String title, String subject, String content, String useYn, String delYn, String inUserId, String upUserId){
//        this.idx = idx;
//        this.pIdx = pIdx;
//        this.title = title;
//        this.subject = subject;
//        this.content = content;
//        this.useYn = useYn;
//        this.delYn = delYn;
//        this.inUserId = inUserId;
//        this.upUserId = upUserId;
//    }



}
