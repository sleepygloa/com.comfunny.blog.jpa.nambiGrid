package com.comfunny.blog.blog.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BlogSaveRequestDto {
    private Long idx;
    private Long i;
    private String type;
    private String content;
    private String imgWidthScale;
    private String title;

    @Builder
    public BlogSaveRequestDto(Long idx, Long i, String type, String content, String imgWidthScale, String title) {
        this.idx = idx;
        this.i = i;
        this.type = type;
        this.content = content;
        this.imgWidthScale = imgWidthScale;
        this.title = title;
    }

    public BlogSaveRequestDto toEntity(){
        return BlogSaveRequestDto.builder()
                .idx(idx)
                .i(i)
                .type(type)
                .content(content)
                .imgWidthScale(imgWidthScale)
                .build();
    }
}
