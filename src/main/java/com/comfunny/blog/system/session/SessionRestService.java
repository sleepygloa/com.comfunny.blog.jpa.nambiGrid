package com.comfunny.blog.system.session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SessionRestService {


    //글 제목
    private final SessionRestRepository sessionRestRepository;

    @Transactional(readOnly = true)
    public SessionDto findByEmail(String userEmail){
        return sessionRestRepository.findByEmail(userEmail);
    }

}
