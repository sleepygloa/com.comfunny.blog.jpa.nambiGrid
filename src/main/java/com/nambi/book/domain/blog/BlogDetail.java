package com.nambi.book.domain.blog;

import com.nambi.book.domain.BaseTimeEntity2;
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
    private Long i;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String imgWidthScale;

    @Builder
    public BlogDetail(Long idx, Long i, String content, String type, String imgWidthScale) {
        this.idx = idx;
        this.i = i;
        this.content = content;
        this.type = type;
        this.imgWidthScale = imgWidthScale;
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
