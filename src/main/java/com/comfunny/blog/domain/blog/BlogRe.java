package com.comfunny.blog.domain.blog;

import com.comfunny.blog.domain.BaseTimeEntity2;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class BlogRe extends BaseTimeEntity2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ref;

    @Column(nullable = false)
    private Long level;

    @Column(nullable = false)
    private Long pRef;

    @Column(nullable = false)
    private Long idx;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String delYn;

    @Column(nullable = false)
    private String inUserId;

    @Column(nullable = false)
    private String upUserId;

    @Column(nullable = false)
    private String inUserEmail;

    @Column(nullable = false)
    private LocalDateTime inDt;

    @Column(nullable = false)
    private LocalDateTime upDt;

    @Builder
    public BlogRe(Long ref, Long level, Long pRef, Long idx, String content, String delYn, String inUserId, String upUserId, String inUserEmail, LocalDateTime inDt, LocalDateTime upDt) {
        this.ref = ref;
        this.level = level;
        this.pRef = pRef;
        this.idx = idx;
        this.content = content;
        this.delYn = delYn;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
        this.inUserEmail = inUserEmail;
        this.inDt = inDt;
        this.upDt = upDt;
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
