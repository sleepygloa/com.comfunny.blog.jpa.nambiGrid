package com.comfunny.blog.blog.service;

import com.comfunny.blog.blog.domain.*;
import com.comfunny.blog.blog.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BlogService {


    //글 제목
    private final BlogRepository blogRepository;

    //글 카테고리
    private final BlogCategoryRepository blogCategoryRepository;

    //글 상세
    private final BlogDetailRepository blogDetailRepository;

    //댓글
    private final BlogReRepository blogReRepository;

    @Transactional(readOnly = true)
    public List<BlogListResponseDto> findAlldesc(){
        return blogRepository.findAllDesc().stream()
                .map(BlogListResponseDto::new)
                .collect(Collectors.toList());
    }



    @Transactional(readOnly = true)
    public List<BlogListCategoryResponseDto> findCategory(){
        return blogCategoryRepository.findCategory().stream()
                .map(BlogListCategoryResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void save(List<Map<String, Object>> list){

        Map<String, Object> mMap = list.get(0);

        int idx = (int)mMap.get("idx");
        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0){
            idx = blogRepository.findMaxMaster();
            blogRepository.insertMaster(idx, (int)mMap.get("pIdx"), (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
                    (String)mMap.get("subject"));
        }else{
            blogRepository.updateMaster(idx, (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
                    (String)mMap.get("subject"));
        }
        blogDetailRepository.deleteDetail(idx);
        for(Map<String, Object> map : list){
            blogDetailRepository.saveDetail(idx, (int)map.get("i"), (String)map.get("type"), (String)map.get("content"), (String)map.get("imgWidthScale"));
        }

    }

    public List<BlogDetailListResponseDto> findById(int idx){
        return blogDetailRepository.findBlogDetailAllDesc(idx).stream()
                .map(BlogDetailListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteMaster (int idx){
        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+idx);

        blogRepository.deleteMaster(idx);
    }


    @Transactional(readOnly = true)
    public List<BlogReListResponseDto> findDesc(int idx){
        return blogReRepository.findDesc(idx).stream()
                .map(BlogReListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveRe(Map map){

        String flag = (String)map.get("flag");
        if(flag.equals("INSERT")){
            int ref = blogReRepository.findMaxMaster();
            blogReRepository.insertMaster((int)map.get("idx"), ref, 0, (String)map.get("name"), (String)map.get("writer"), (String)map.get("content"));
        }else if(flag.equals("UPDATE")){
            int ref = (int)map.get("ref");
            int cnt = blogReRepository.findMaster(ref);
            if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+ref);

            blogReRepository.updateMaster((int)map.get("idx"), ref, (String)map.get("content"));
        }else if(flag.equals("INSERT_RE")){
            int ref = blogReRepository.findMaxMaster();
            blogReRepository.insertMaster((int)map.get("idx"), ref, (int)map.get("pRef"), (String)map.get("name"), (String)map.get("writer"), (String)map.get("content"));
        }



//        Map<String, Object> mMap = list.get(0);
//
//        int idx = (int)mMap.get("idx");
//        if(cnt == 0){
//            idx = blogRepository.findMaxMaster();
//            blogRepository.insertMaster(idx, (int)mMap.get("pIdx"), (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
//                    (String)mMap.get("hashIndex"),(String)mMap.get("subject"));
//        }else{
//            blogRepository.updateMaster(idx, (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
//                    (String)mMap.get("hashIndex"),(String)mMap.get("subject"));
//        }
//        blogDetailRepository.deleteDetail(idx);
//        for(Map<String, Object> map : list){
//            blogDetailRepository.saveDetail(idx, (int)map.get("i"), (String)map.get("type"), (String)map.get("content"), (String)map.get("imgWidthScale"));
//        }

    }

    @Transactional
    public void deleteRe(Map map){
        int ref = (int)map.get("ref");

        int cnt = blogReRepository.findMaster(ref);
        if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+ref);

        blogReRepository.deleteRe(ref);
    }


    @Transactional
    public void saveMd(int idx, String title, String categoryA, String categoryB, String categoryC, String content, String url){


        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0){
            idx = blogRepository.findMaxMaster();
            blogRepository.insertMd(idx, 0,categoryA,categoryB,categoryC, title, content, url);
        }else{
            blogRepository.updateMd(idx, categoryA,categoryB,categoryC, title, content, url);
        }

    }
//	@Override
//	public void saveBlogFileUpload(Params inParams, MultipartHttpServletRequest req) throws Exception{
//
//		blogDao.deleteMainBlogFileList(inParams);
//		List<Map<String,Object>> list = fileUtils.parseUpdateFileInfo(inParams, req);
//		Map<String,Object> tempMap = null;
//		for(int i=0, size=list.size(); i<size; i++){
//			tempMap = list.get(i);
//			if(tempMap.get("IS_NEW").equals("Y")){
//				blogDao.insertMainBlogFile(tempMap);
//			}else{
//				blogDao.updateMainBlogFile(tempMap);
//			}
//		}
//	}


    //	public void insertMainBlogFile(Map<String, Object> map) throws Exception{
//		insert("blogService.insertMainBlogFile", map);
//	}
//
//	@SuppressWarnings("unchecked")
//	public List<Map<String, Object>> selectFileList(Map<String, Object> map) throws Exception{
//		return (List<Map<String, Object>>)selectList("blogService.getMainBlogSelectFileList", map);
//	}
//
//	public void deleteMainBlogFileList(Map<String, Object> map) throws Exception{
//		update("blogService.deleteMainBlogFileList", map);
//	}
//
//	public void updateMainBlogFile(Map<String, Object> map) throws Exception{
//		update("blogService.updateMainBlogFile", map);
//	}
//






//<!-- 파일 업로드 -->
//	<insert id="insertMainBlogFile" parameterType="hashmap" useGeneratedKeys="true" keyProperty="IDX">
// 	 	<selectKey keyProperty="IDX" resultType="int" order="BEFORE">
//    SELECT IFNULL(MAX(IDX) + 1, 1) AS IDX FROM TB_BLOG_D_FILE
//		</selectKey>
//    INSERT INTO TB_BLOG_D_FILE
//            (
//                    IDX,
//                    BOARD_IDX,
//                    ORIGINAL_FILE_NAME,
//                    STORED_FILE_NAME,
//                    FILE_SIZE,
//                    IN_DT,
//                    S_USERID
//                    )
//    VALUES
//            (
//				#{IDX},
//            #{boardIdx},
//            #{originalFileName},
//            #{storedFileName},
//            #{fileSize},
//    now(),
//				#{s_userId}
//			)
//	</insert>
//
//	<select id="getMainBlogSelectFileList" parameterType="hashmap" resultType="hashmap">
//    SELECT
//            IDX
//            ,	BOARD_IDX
//            ,	ORIGINAL_FILE_NAME
//		,   ROUND(FILE_SIZE/1024,1) AS FILE_SIZE
//    FROM
//            TB_BLOG_D_FILE
//    WHERE
//    BOARD_IDX = #{idx}
//    AND DEL_YN = 'N'
//            </select>
//
//	<update id="deleteMainBlogFileList" parameterType="hashmap">
//    UPDATE
//            TB_BLOG_D_FILE
//    SET
//            DEL_YN = 'Y'
//    WHERE
//    BOARD_IDX = #{idx}
//	</update>
//
//	<update id="updateMainBlogFile" parameterType="hashmap">
//    UPDATE
//            TB_BLOG_D_FILE
//    SET
//            DEL_YN = 'N'
//    WHERE
//    IDX = #{file_idx}
//	</update>

}
