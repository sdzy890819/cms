package com.cn.cms.app.web;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.bo.ImagesSearch;
import com.cn.cms.middleware.bo.NewsSearch;
import com.cn.cms.middleware.bo.VideoSearch;
import com.cn.cms.middleware.po.QueryResult;
import com.cn.cms.po.Images;
import com.cn.cms.po.News;
import com.cn.cms.po.Video;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by zhangyang on 17/2/8.
 */
@RestController
@RequestMapping(value="/app/search/",produces = "application/json; charset=UTF-8")
public class AppSearchController extends AppBaseController {

    @Resource
    private ESearchClient eSearchClient;

    @Resource
    private NewsBiz newsBiz;

    /**
     * 全文检索新闻
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "appnews:search")
    @RequestMapping(value = "/searchNew", method = RequestMethod.POST)
    public String searchNews(@RequestParam(value = "condition", required = false) String condition,
                             @RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize){

        SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM);
        NewsSearch newsSearch = new NewsSearch();
        newsSearch.setCondition(condition);
        Page pageObj = new Page(page, pageSize);
        QueryResult<News> queryResult = eSearchClient.searchNews(newsSearch,pageObj);
        List<News> list = queryResult.getList();
        newsBiz.dataInit(list);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 图片检索
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "appimages:search")
    @RequestMapping(value = "/searchImages", method = RequestMethod.POST)
    public String searchImages(@RequestParam(value = "condition", required = false) String condition,
                               @RequestParam(value = "page", required = false) Integer page,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize){

        ImagesSearch imagesSearch = new ImagesSearch();
        imagesSearch.setCondition(condition);
        Page pageObj = new Page(page, pageSize);
        QueryResult<Images> queryResult = eSearchClient.searchImages(imagesSearch,pageObj);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 视频检索
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "appvideo:search")
    @RequestMapping(value = "/searchVideo", method = RequestMethod.POST)
    public String searchVideo(@RequestParam(value = "condition", required = false) String condition,
                              @RequestParam(value = "page", required = false) Integer page,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize){

        VideoSearch videoSearch = new VideoSearch();
        videoSearch.setCondition(condition);
        Page pageObj = new Page(page, pageSize);
        QueryResult<Video> queryResult = eSearchClient.searchVideo(videoSearch,pageObj);
        return ApiResponse.returnSuccess(queryResult);
    }

}
