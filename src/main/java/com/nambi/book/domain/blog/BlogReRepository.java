package com.nambi.book.domain.blog;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogReRepository extends JpaRepository<BlogRe, Long> {

    @Query(value = "SELECT a.REF, a.P_REF, a.IDX, a.CONTENT, a.DEL_YN, a.IN_USER_ID, a.UP_USER_ID, a.IN_USER_EMAIL, a.IN_DT, a.UP_DT, CASE WHEN b.p_ref IS NULL THEN a.ref ELSE b.ref END LEVEL" +
                   "  FROM blog_re a" +
        "  LEFT OUTER JOIN blog_re b ON a.P_REF = b.REF" +
                   " WHERE a.IDX = :idx  " +
                " ORDER BY LEVEL, a.REF", nativeQuery = true)
    List<BlogRe> findDesc(@Param("idx") int idx);

    @Query(value = "SELECT count(*) as cnt FROM blog_re WHERE REF = :ref ", nativeQuery = true)
    int findMaster(@Param("ref") int ref);

    @Query(value = "SELECT CASE WHEN MAX(REF) IS NULL THEN 1 ELSE MAX(REF)+1 END AS MAX FROM blog_re ", nativeQuery = true)
    int findMaxMaster();

    @Query(value = "INSERT INTO blog_re (IDX, REF, P_REF, CONTENT, IN_USER_ID, UP_USER_ID, IN_USER_EMAIL, IN_DT, UP_DT) VALUES " +
                                    "(:idx, :ref, :pRef, :content, :name, :name, :email, now(), now() )", nativeQuery = true)
    void insertMaster(@Param("idx") int idx, @Param("ref") int ref, @Param("pRef") int pRef, @Param("name") String name, @Param("email") String email, @Param("content") String content);

    @Query(value = "UPDATE blog_re SET DEL_YN = 'Y' WHERE REF = :ref", nativeQuery = true)
    void deleteRe(@Param("ref") int ref);

    @Query(value = "UPDATE blog_re SET CONTENT = :content, UP_DT = now() WHERE REF = :ref AND IDX = :idx ", nativeQuery = true)
    void updateMaster(@Param("idx") int idx, @Param("ref") int ref, @Param("content") String content);

//    @Query(value = "SELECT count(*) as cnt FROM Blog WHERE IDX = :idx")
//    int findMaster(@Param("idx") int idx);
//
//    @Query(value = "SELECT max(idx)+1 as max FROM Blog " )
//    int findMaxMaster();
//
//    @Query(value = "INSERT INTO blog (IDX, P_IDX, CATEGORYA, CATEGORYB, CATEGORYC, HASH_INDEX, SUBJECT) VALUES " +
//                                    "(:idx, :pIdx, :categoryA, :categoryB, :categoryC, :hashIndex, :subject)", nativeQuery = true)
//    void insertMaster(@Param("idx") int idx, @Param("pIdx") int pIdx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
//    , @Param("hashIndex") String hashIndex, @Param("subject") String subject);
//
//    @Query(value = "UPDATE blog SET CATEGORYA = :categoryA, CATEGORYB = :categoryB, CATEGORYC = :categoryC, HASH_INDEX = :hashIndex, SUBJECT = :subject" +
//            " WHERE IDX = :idx", nativeQuery = true)
//    void updateMaster(@Param("idx") int idx, @Param("categoryA") String categoryA, @Param("categoryB") String categoryB, @Param("categoryC") String categoryC
//            , @Param("hashIndex") String hashIndex, @Param("subject") String subject);
//
//    @Query(value = "UPDATE blog SET DEL_YN = 'Y' WHERE IDX = :idx", nativeQuery = true)
//    void deleteMaster(@Param("idx") int idx);

}
