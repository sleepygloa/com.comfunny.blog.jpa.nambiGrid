package com.comfunny.blog.blog.controller;

import com.comfunny.blog.blog.dto.*;
import com.comfunny.blog.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class BlogRestController {

    private final BlogService blogService;

    /***************************************
     * 블로그 리스트 조회
     ***************************************/
    @GetMapping("/b/blog/list")
    public List<BlogListResponseDto> list(@RequestParam(value="searchA", defaultValue = "") String searchA, @RequestParam(value="searchB", defaultValue = "") String searchB){
        if(searchA.equals("")){
            return blogService.findAlldesc();
        }else{
            if(searchB.equals("")){
                try {
                    searchA  = URLDecoder.decode(searchA, StandardCharsets.UTF_8.toString());
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return blogService.findAlldesc(searchA);

            }else{
                try {
                    searchA  = URLDecoder.decode(searchA, StandardCharsets.UTF_8.toString());
                    searchB  = URLDecoder.decode(searchB, StandardCharsets.UTF_8.toString());
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return blogService.findAlldesc(searchA, searchB);
            }

        }

    }



    /***************************************
     * 블로그 카테고리 데이터셋 조회
     ***************************************/
    @GetMapping("/b/blog/listCategory")
    public List<BlogListCategoryResponseDto> findGetegory(){ return blogService.findCategory();
    }

    /***************************************
     * 글 저장
     ***************************************/
    @PostMapping("/b/blog/save")
    public void save(@RequestBody Map map){
        blogService.save((List<Map<String, Object>>)map.get("list"));
    }

    /***************************************
     * 글삭제
     ***************************************/
    @DeleteMapping("/b/blog/delete")
    public void deleteMaster(@RequestParam int idx){
        blogService.deleteMaster(idx);
    }

    /***************************************
     * 글 상세보기
     ***************************************/
    @GetMapping("/b/blog/view")
    public List<BlogDetailListResponseDto> findById(@RequestParam int idx){
        return blogService.findById(idx);
    }

    /***************************************
     * 댓글 리스트 조회
     ***************************************/
    @GetMapping("/b/blog/listRe")
    public List<BlogReListResponseDto> listRe(@RequestParam int idx){
        return blogService.findDesc(idx);
    }

    /***************************************
     * 댓글 저장
     ***************************************/
    @PostMapping("/b/blog/saveRe")
    public void saveRe(@RequestBody Map data){ blogService.saveRe(data); }

    /***************************************
     * 댓글 삭제
     ***************************************/
    @DeleteMapping("/b/blog/deleteRe")
    public void deleteRe(@RequestBody Map data){ blogService.deleteRe(data); }



    /***************************************
     * 글 저장 (md)
     ***************************************/
    @PostMapping("/b/blog/saveMd")
    public void saveMd(@RequestParam int idx, @RequestParam String title, @RequestParam String categoryA, @RequestParam String categoryB, @RequestParam String categoryC, @RequestParam String content, @RequestParam String url){
        blogService.saveMd(idx, title, categoryA, categoryB, categoryC, content, url);
    }


    //	//블로그 글 수정완료 후 파일 업로드
//	@RequestMapping("/b/blogFileUpload")
//	public ModelAndView saveBlogFileUpload(MultipartHttpServletRequest req) {
//		System.out.println("/saveBlogFileUpload inParams : "+inParams);
//		ModelAndView mv = new ModelAndView("jsonView");
//		try {
//			blogService.saveBlogFileUpload(inParams, req);
//		}catch(Exception e) {
//			System.out.println("ERROR" + e);
//			e.printStackTrace();
//		}
//		mv.addObject("SUCCESS", "글이 수정되었습니다.");
//		return mv;
//	}

}
