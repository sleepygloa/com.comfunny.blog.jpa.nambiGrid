package com.comfunny.blog.system.session;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionRestRepository extends JpaRepository<SessionDto, Long> {

    @Query(value = "select id, name, email, picture, CASE WHEN role = 'ADMIN' THEN 'A' WHEN role = 'USER' THEN 'U' ELSE 'G' END AS role  from user where email = :userEmail", nativeQuery = true)
    SessionDto findByEmail(@Param("userEmail") String userEmail);

}
