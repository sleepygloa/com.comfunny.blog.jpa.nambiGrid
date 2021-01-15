package com.comfunny.blog.blog.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BlogReSaveRequestDto {
    private Long idx;
    private Long ref;
    private Long reStep;
    private Long reLevel;
    private String writer;
    private String content;
    private String flag;

    @Builder
    public BlogReSaveRequestDto(Long idx, Long ref, Long reStep, Long reLevel, String writer, String content, String flag) {
        this.idx = idx;
        this.ref = ref;
        this.reStep = reStep;
        this.reLevel = reLevel;
        this.writer = writer;
        this.content = content;
        this.flag = flag;
    }


    public BlogReSaveRequestDto toEntity(){
        return BlogReSaveRequestDto.builder()
                .idx(idx)
                .ref(ref)
                .reStep(reStep)
                .reLevel(reLevel)
                .writer(writer)
                .content(content)
                .flag(flag)
                .build();
    }
}
