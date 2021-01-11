package com.nambi.book.service.blog;

import com.nambi.book.domain.blog.Blog;
import com.nambi.book.domain.blog.BlogDetail;
import com.nambi.book.domain.blog.BlogDetailRepository;
import com.nambi.book.domain.blog.BlogRepository;
import com.nambi.book.web.dto.blog.BlogDetailListResponseDto;
import com.nambi.book.web.dto.blog.BlogListResponseDto;
import com.nambi.book.web.dto.blog.BlogSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BlogService {

    private final BlogRepository blogRepository;

    private final BlogDetailRepository blogDetailRepository;

    @Transactional
    public void save(List<Map<String, Object>> list){

        Map<String, Object> mMap = list.get(0);

        int idx = (int)mMap.get("idx");
        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0){
            idx = blogRepository.findMaxMaster();
            blogRepository.insertMaster(idx, (int)mMap.get("pIdx"), (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
                    (String)mMap.get("hashIndex"),(String)mMap.get("subject"));
        }else{
            blogRepository.updateMaster(idx, (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
                    (String)mMap.get("hashIndex"),(String)mMap.get("subject"));
        }
        blogDetailRepository.deleteDetail(idx);
        for(Map<String, Object> map : list){
            blogDetailRepository.saveDetail(idx, (int)map.get("i"), (String)map.get("type"), (String)map.get("content"), (String)map.get("imgWidthScale"));
        }

    }
//
//    @Transactional
//    public Long update(Long id, PostsUpdateRequestDto requestDto){
//        Blog posts = blogRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));
//
//        posts.update(requestDto.getTitle(), requestDto.getContent());
//
//        return id;
//    }
//
    public List<BlogDetailListResponseDto> findById(int idx){
        return blogDetailRepository.findBlogDetailAllDesc(idx).stream()
                .map(BlogDetailListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BlogListResponseDto> findAlldesc(){
        return blogRepository.findAllDesc().stream()
                .map(BlogListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteMaster (int idx){
        int cnt = blogRepository.findMaster(idx);
        if(cnt == 0) new IllegalArgumentException("해당 게시글이 없습니다. id="+idx);

        blogRepository.deleteMaster(idx);
    }
}
