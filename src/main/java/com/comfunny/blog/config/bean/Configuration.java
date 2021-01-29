package com.comfunny.blog.config.bean;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@org.springframework.context.annotation.Configuration
public class Configuration {

    private final ConfigurationSessionDeleteRepository configurationSessionDeleteRepository;

    @Bean
    public void setting(){

        try {
            configurationSessionDeleteRepository.delete();
        }catch(Exception e){

            e.printStackTrace();
        }

    }
}
