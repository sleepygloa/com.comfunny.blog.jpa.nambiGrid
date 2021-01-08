package com.nambi.book.service.blog;

import com.nambi.book.domain.blog.BlogRepository;
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

    @Transactional
    public int save(List<Map<String, Object>> list){
        int rLong = 0;

        if(list.size() == 0){ return 0; }

        if(list.get(0).get("flag").equals("INSERT")){
            Map<String, Object> mMap = list.get(0);
            System.out.println(mMap.toString());
            blogRepository.saveMaster((int)mMap.get("idx"), (int)mMap.get("pIdx"), (String)mMap.get("categoryA"), (String)mMap.get("categoryB"), (String)mMap.get("categoryC"),
                    (String)mMap.get("hashIndex"),(String)mMap.get("subject"));

            for(Map<String, Object> map : list){
                blogRepository.saveDetail((int)map.get("idx"), (int)map.get("i"), (String)map.get("type"), (String)map.get("content"), (String)map.get("imgWidthScale"));
                rLong++;
            }

        }


        return rLong;
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
//    public PostsResponseDto findById(Long id){
//        Blog entity = blogRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));
//
//        return new BlogResponseDto(entity);
//    }

    @Transactional(readOnly = true)
    public List<BlogListResponseDto> findAlldesc(){
        return blogRepository.findAllDesc().stream()
                .map(BlogListResponseDto::new)
                .collect(Collectors.toList());
    }

//    @Transactional
//    public void delete (Long id){
//        Blog posts = blogRepository.findById(id)
//                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
//
//        blogRepository.delete(posts);
//    }
}
