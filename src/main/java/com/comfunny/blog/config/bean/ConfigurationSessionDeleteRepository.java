package com.comfunny.blog.config.bean;


import com.comfunny.blog.system.session.SessionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConfigurationSessionDeleteRepository extends JpaRepository<ConfigurationSessionDeleteDto, String> {

    @Query(value = "delete from SPRING_SESSION", nativeQuery = true)
    void delete();

}
