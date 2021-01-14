package com.comfunny.blog.domain.blog;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogDetailRepository extends JpaRepository<BlogDetail, Long> {

    @Query(value = "DELETE FROM blog_detail WHERE  IDX = :idx", nativeQuery = true)
    void deleteDetail(@Param("idx") int idx);

    @Query(value = "INSERT INTO blog_detail (IDX, I, TYPE, CONTENT, IMG_WIDTH_SCALE) VALUES (:idx, :i, :type, :content, :imgWidthScale)", nativeQuery = true)
    void saveDetail(@Param("idx") int idx, @Param("i") int i, @Param("type") String type, @Param("content") String content, @Param("imgWidthScale") String imgWidthScale);

    @Query(value = "SELECT b.CATEGORYA, b.CATEGORYB, b.CATEGORYC, b.SUBJECT, bd.* FROM blog b INNER JOIN blog_detail bd ON b.IDX = bd.IDX WHERE b.IDX = :idx ORDER BY bd.IDX ASC", nativeQuery = true)
    List<BlogDetail> findBlogDetailAllDesc(@Param("idx") int idx);

}
