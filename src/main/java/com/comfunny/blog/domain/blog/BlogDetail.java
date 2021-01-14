package com.comfunny.blog.domain.blog;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class BlogDetail extends BaseTimeEntity2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private String categoryA;

    @Column(nullable = false)
    private String categoryB;

    @Column(nullable = false)
    private String categoryC;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private Long i;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String imgWidthScale;

    @Builder
    public BlogDetail(Long idx, String categoryA, String categoryB, String categoryC, String subject, Long i, String content, String type, String imgWidthScale) {
        this.idx = idx;
        this.categoryA = categoryA;
        this.categoryB = categoryB;
        this.categoryC = categoryC;
        this.subject = subject;
        this.i = i;
        this.content = content;
        this.type = type;
        this.imgWidthScale = imgWidthScale;
    }
}
