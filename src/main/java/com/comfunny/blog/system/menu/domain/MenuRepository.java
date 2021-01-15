package com.comfunny.blog.system.menu.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query("SELECT p FROM Menu p ORDER BY p.menuLev, p.menuParentSeq, p.menuSeq ASC")
    List<Menu> findAllDesc();
}
