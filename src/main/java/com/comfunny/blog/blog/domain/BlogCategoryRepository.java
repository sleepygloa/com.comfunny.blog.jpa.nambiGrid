package com.comfunny.blog.blog.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {

    @Query(value = "SELECT max(idx) as IDX, CATEGORYA, CATEGORYB, CATEGORYC FROM blog  GROUP BY CATEGORYA, CATEGORYB, CATEGORYC ORDER BY CATEGORYA, CATEGORYB, CATEGORYC", nativeQuery = true)
    List<BlogCategory> findCategory();


}
