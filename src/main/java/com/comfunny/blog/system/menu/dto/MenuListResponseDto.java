package com.comfunny.blog.system.menu.dto;

import com.comfunny.blog.system.menu.domain.Menu;
import lombok.Getter;

@Getter
public class MenuListResponseDto {

    private long menuSeq;
    private long menuParentSeq;
    private long menuLev;
    private String menuCd;
    private String menuNm;
    private String menuIcon;
    private String menuUrl;
    private String menuOrder;
    private String deviceFlag;
    private String blogYn;
    private String useYn;
    private String delYn;
    private String inUserId;
    private String upUserId;

    public MenuListResponseDto(Menu entity) {
        this.menuSeq = entity.getMenuSeq();
        this.menuParentSeq = entity.getMenuParentSeq();
        this.menuLev = entity.getMenuLev();
        this.menuCd = entity.getMenuCd();
        this.menuNm = entity.getMenuNm();
        this.menuIcon = entity.getMenuIcon();
        this.menuUrl = entity.getMenuUrl();
        this.menuOrder = entity.getMenuOrder();
        this.deviceFlag = entity.getDeviceFlag();
        this.blogYn = entity.getBlogYn();
        this.useYn = entity.getUseYn();
        this.delYn = entity.getDelYn();
        this.inUserId = entity.getInUserId();
        this.upUserId = entity.getUpUserId();

    }
}
