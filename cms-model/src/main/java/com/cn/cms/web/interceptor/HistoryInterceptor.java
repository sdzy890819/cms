package com.cn.cms.web.interceptor;

import com.cn.cms.biz.OperationHistoryBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.OperationHistory;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.NotSaveBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.BufferedReader;
import java.util.Collection;
import java.util.Date;

/**
 * 历史纪录
 * Created by zhangyang on 16/12/1.
 */
public class HistoryInterceptor extends HandlerInterceptorAdapter {

    private CommonLog log = CommonLogFactory.getLog(HistoryInterceptor.class);

    @Resource
    private OperationHistoryBiz operationHistoryBiz;

    /**
     * This implementation always returns {@code true}.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        return true;
    }

    /**
     * This implementation is empty.
     */
    @Override
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
        record(request, response, handler);
    }


    private void record(HttpServletRequest request, HttpServletResponse response, Object handler){
        try {
            OperationHistory operationHistory = new OperationHistory();
            operationHistory.setLastModifyUserId(StaticContants.CMS_OPERATION_USER_ID);
            operationHistory.setCurrTime(new Date());
            if (handler instanceof HandlerMethod) {
                HandlerMethod hm = (HandlerMethod) handler;
                CheckAuth checkAuth = hm.getMethodAnnotation(CheckAuth.class);
                if (checkAuth != null) {
                    operationHistory.setDescription(checkAuth.name());
                }
            }
            operationHistory.setUrl(request.getContextPath() + request.getServletPath() + "?" +
                    request.getQueryString());
            boolean bool = true;
            if (handler instanceof HandlerMethod) {
                HandlerMethod hm = (HandlerMethod) handler;
                NotSaveBody notSaveBody = hm.getMethodAnnotation(NotSaveBody.class);
                if (notSaveBody != null) {
                    bool = false;
                }
            }
            if (bool) {
                BufferedReader bufferedReader = request.getReader();
                StringBuffer sbf = new StringBuffer();
                String tmp = null;
                while ((tmp = bufferedReader.readLine()) != null) {
                    sbf.append(tmp);
                }
                operationHistory.setBody(sbf.toString());
            }
            operationHistory.setUserId(CookieUtil.getCookieVal(request, StaticContants.COOKIE_USER_ID));
            operationHistoryBiz.recordRedis(operationHistory);
        }catch (Exception e){
            log.error(e);
        }
    }

    /**
     * This implementation is empty.
     * 纪录所有的操作纪录
     */
    @Override
    public void afterCompletion(
            HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

    }

    /**
     * This implementation is empty.
     */
    @Override
    public void afterConcurrentHandlingStarted(
            HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
    }

}
