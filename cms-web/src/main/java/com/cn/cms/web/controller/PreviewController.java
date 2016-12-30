package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by zhangyang on 16/12/30.
 */

@Controller
public class PreviewController extends BaseController {

    @Resource
    private NewsBiz newsBiz;


    @CheckToken
    @CheckAuth( name = "news:preview" )
    @RequestMapping(value = "/news/preview", method = RequestMethod.GET ,produces = "text/html; charset=UTF-8")
    public String preview(HttpServletRequest request,
                          HttpServletResponse response,
                          @RequestParam(value = "id") Long id) throws IOException {
        String content = null;

        response.getWriter().write(content);
        response.getWriter().flush();
        response.getWriter().close();
        return null;
    }

}
