package com.comfunny.blog.system.session;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class IndexSessionResponseDto {

    private final String userName;
    private final String userEmail;
}
