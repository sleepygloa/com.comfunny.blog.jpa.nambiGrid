package com.comfunny.blog.blog.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {


    @Query(value = "SELECT * FROM blog p WHERE DEL_YN = 'N' ORDER BY p.IDX ASC", nativeQuery = true)
    List<Blog> findAllDesc();

    @Query(value = "SELECT * FROM blog p WHERE DEL_YN = 'N' AND CATEGORYA = :searchA ORDER BY p.IDX ASC", nativeQuery = true)
    List<Blog> findAllDesc(@Param("searchA") String searchA);

    @Query(value = "SELECT * FROM blog p WHERE DEL_YN = 'N' AND CATEGORYA = :searchA AND CATEGORYB = :searchB ORDER BY p.IDX ASC", nativeQuery = true)
    List<Blog> findAllDesc(@Param("searchA") String searchA, @Param("searchB") String searchB);

    @Query(value = "SELECT count(*) as cnt FROM Blog WHERE IDX = :idx")
    int findMaster(@Param("idx") int idx);

    @Query(value = "SELECT max(idx)+1 as max FROM Blog " )
    int findMaxMaster();

    @Query(value = "INSERT INTO blog (IDX, P_IDX, CATEGORYA, CATEGORYB, CATEGORYC,  TITLE) VALUES " +
                                    "(:idx, :pIdx, :categoryA, :categoryB, :categoryC, :title)", nativeQuery = true)
    void insertMaster(@Param("idx") int idx, @Param("pIdx") int pIdx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
    , @Param("title") String title);

    @Query(value = "UPDATE blog SET CATEGORYA = :categoryA, CATEGORYB = :categoryB, CATEGORYC = :categoryC, TITLE = :title" +
            " WHERE IDX = :idx", nativeQuery = true)
    void updateMaster(@Param("idx") int idx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
            ,  @Param("title") String title);

    @Query(value = "UPDATE blog SET DEL_YN = 'Y' WHERE IDX = :idx", nativeQuery = true)
    void deleteMaster(@Param("idx") int idx);

    @Query(value = "INSERT INTO blog (IDX, P_IDX, CATEGORYA, CATEGORYB, CATEGORYC, TITLE, MARKDOWN_YN, GITHUB_URL, MARKDOWN_CONTENT) VALUES " +
            "(:idx, :pIdx, :categoryA, :categoryB, :categoryC, :title, 'Y', :url, :content)", nativeQuery = true)
    void insertMd(@Param("idx") int idx, @Param("pIdx") int pIdx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
            , @Param("title") String title, @Param("content") String content, @Param("url") String url);

    @Query(value = "UPDATE blog SET CATEGORYA = :categoryA, CATEGORYB = :categoryB, CATEGORYC = :categoryC, TITLE = :title, GITHUB_URL = :url, MARKDOWN_CONTENT = :content " +
            " WHERE IDX = :idx", nativeQuery = true)
    void updateMd(@Param("idx") int idx,  @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
            , @Param("title") String title, @Param("content") String content, @Param("url") String url);



    @Query(value = "SELECT CATEGORYA, CATEGORYB, CATEGORYC FROM blog p GROUP BY CATEGORYA, CATEGORYB, CATEGORYC ORDER BY CATEGORYA, CATEGORYB, CATEGORYC", nativeQuery = true)
    List<Blog> findCategory();
}
