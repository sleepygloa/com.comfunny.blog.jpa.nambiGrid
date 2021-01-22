package com.comfunny.blog.blog.domain;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class BlogCategory  {

    @Id
    private Long idx;

    @Column(nullable = true)
    private String categoryA;

    @Column(nullable = true)
    private String categoryB;

    @Column(nullable = true)
    private String categoryC;

    @Builder
    public BlogCategory(Long idx, String categoryA, String categoryB, String categoryC) {
        this.idx = idx;
        this.categoryA = categoryA;
        this.categoryB = categoryB;
        this.categoryC = categoryC;
    }
}
