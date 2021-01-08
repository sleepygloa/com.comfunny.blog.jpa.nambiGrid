package com.nambi.book.domain.blog;


import com.nambi.book.domain.posts.Posts;
import com.nambi.book.web.dto.blog.BlogSaveRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query("SELECT p FROM Blog p ORDER BY p.idx ASC")
    List<Blog> findAllDesc();

    @Query(value = "INSERT INTO blog (IDX, P_IDX, CATEGORYA, CATEGORYB, CATEGORYC, HASH_INDEX, SUBJECT) VALUES " +
                                    "(:idx, :pIdx, :categoryA, :categoryB, :categoryC, :hashIndex, :subject)", nativeQuery = true)
    void saveMaster(@Param("idx") int idx, @Param("pIdx") int pIdx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
    , @Param("hashIndex") String hashIndex, @Param("subject") String subject);

    @Query(value = "INSERT INTO blogDetail (IDX, I, TYPE, CONTENT, IMG_WIDTH_SCALE) VALUES (:idx, :i, :type, :content, :imgWidthScale)", nativeQuery = true)
    void saveDetail(@Param("idx") int idx, @Param("i") int i, @Param("type") String type, @Param("content") String content, @Param("imgWidthScale") String imgWidthScale);

    @Query("SELECT p FROM BlogDetail p ORDER BY p.idx ASC")
    List<BlogDetail> findBlogDetailAllDesc();

}
