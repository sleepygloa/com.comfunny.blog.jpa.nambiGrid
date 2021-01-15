package com.comfunny.blog.system.menu.dto;

import com.comfunny.blog.system.menu.domain.Menu;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
public class MenuSaveRequestDto {

    String flag;
    long menuSeq;
    long menuParentSeq;
    long menuLev;
    String menuCd;
    String menuNm;
    String menuIcon;
    String menuUrl;
    String menuOrder;
    String deviceFlag;
    String blogYn;
    String useYn;
    String delYn;
    String inUserId;
    String upUserId;

    @Builder
    public MenuSaveRequestDto(String flag, long menuSeq, long menuParentSeq, long menuLev, String menuCd, String menuNm, String menuIcon, String menuUrl, String menuOrder, String deviceFlag, String blogYn, String useYn, String delYn, String inUserId, String upUserId) {
        this.flag = flag;
        this.menuSeq = menuSeq;
        this.menuParentSeq = menuParentSeq;
        this.menuLev = menuLev;
        this.menuCd = menuCd;
        this.menuNm = menuNm;
        this.menuIcon = menuIcon;
        this.menuUrl = menuUrl;
        this.menuOrder = menuOrder;
        this.deviceFlag = deviceFlag;
        this.blogYn = blogYn;
        this.useYn = useYn;
        this.delYn = delYn;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
    }

    public Menu toEntity(){
        return Menu.builder()
                .menuSeq(menuSeq)
                .menuParentSeq(menuParentSeq)
                .menuLev(menuLev)
                .menuCd(menuCd)
                .menuNm(menuNm)
                .menuIcon(menuIcon)
                .menuUrl(menuUrl)
                .menuOrder(menuOrder)
                .deviceFlag(deviceFlag)
                .blogYn(blogYn)
                .useYn(useYn)
                .delYn(delYn)
                .inUserId(inUserId)
                .upUserId(upUserId)
                .build();
    }
}
