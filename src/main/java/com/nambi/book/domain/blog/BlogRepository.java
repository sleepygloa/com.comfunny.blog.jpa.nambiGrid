package com.nambi.book.domain.blog;


import com.nambi.book.domain.posts.Posts;
import com.nambi.book.web.dto.blog.BlogSaveRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query(value = "SELECT * FROM blog p WHERE DEL_YN = 'N' ORDER BY p.IDX ASC", nativeQuery = true)
    List<Blog> findAllDesc();

    @Query(value = "SELECT count(*) as cnt FROM Blog WHERE IDX = :idx")
    int findMaster(@Param("idx") int idx);

    @Query(value = "SELECT max(idx)+1 as max FROM Blog " )
    int findMaxMaster();

    @Query(value = "INSERT INTO blog (IDX, P_IDX, CATEGORYA, CATEGORYB, CATEGORYC, HASH_INDEX, SUBJECT) VALUES " +
                                    "(:idx, :pIdx, :categoryA, :categoryB, :categoryC, :hashIndex, :subject)", nativeQuery = true)
    void insertMaster(@Param("idx") int idx, @Param("pIdx") int pIdx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
    , @Param("hashIndex") String hashIndex, @Param("subject") String subject);

    @Query(value = "UPDATE blog SET CATEGORYA = :categoryA, CATEGORYB = :categoryB, CATEGORYC = :categoryC, HASH_INDEX = :hashIndex, SUBJECT = :subject" +
            " WHERE IDX = :idx", nativeQuery = true)
    void updateMaster(@Param("idx") int idx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
            , @Param("hashIndex") String hashIndex, @Param("subject") String subject);

    @Query(value = "UPDATE blog SET DEL_YN = 'Y' WHERE IDX = :idx", nativeQuery = true)
    void deleteMaster(@Param("idx") int idx);

}
