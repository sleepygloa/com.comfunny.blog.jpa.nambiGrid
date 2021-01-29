package com.comfunny.blog.config.bean;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class ConfigurationSessionDeleteDto {

    @Id
    @Column
    private String PRIMARY_ID;
    @Column
    private String SESSION_ID;
    @Column
    private Long CREATION_TIME;
    @Column
    private Long LAST_ACCESS_TIME;
    @Column
    private Long MAX_INACTIVE_INTERVAL;
    @Column
    private Long EXPIRY_TIME;
    @Column
    private String PRINCIPAL_NAME;

    @Builder
    public ConfigurationSessionDeleteDto(String PRIMARY_ID, String SESSION_ID, Long CREATION_TIME, Long LAST_ACCESS_TIME, Long MAX_INACTIVE_INTERVAL, Long EXPIRY_TIME, String PRINCIPAL_NAME) {
        this.PRIMARY_ID = PRIMARY_ID;
        this.SESSION_ID = SESSION_ID;
        this.CREATION_TIME = CREATION_TIME;
        this.LAST_ACCESS_TIME = LAST_ACCESS_TIME;
        this.MAX_INACTIVE_INTERVAL = MAX_INACTIVE_INTERVAL;
        this.EXPIRY_TIME = EXPIRY_TIME;
        this.PRINCIPAL_NAME = PRINCIPAL_NAME;
    }
}
