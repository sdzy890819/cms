package com.cn.cms.web.controller;

import com.cn.cms.biz.FragmentBiz;
import com.cn.cms.bo.FragmentBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.RegexNumEnum;
import com.cn.cms.po.Fragment;
import com.cn.cms.po.FragmentClassify;
import com.cn.cms.po.FragmentHistory;
import com.cn.cms.utils.FragmentUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/1.
 */
@Controller
@RequestMapping(value="/fragment/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class FragmentController extends BaseController {


    @Resource
    private FragmentBiz fragmentBiz;

    /**
     * 获取碎片列表
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:read" )
    @RequestMapping(value = "/listFragment", method = RequestMethod.GET)
    public String listFragment(@RequestParam(value = "page",defaultValue = "1") Integer page,
                               @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        List<Fragment> list = fragmentBiz.listFragment(pageObj);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", pageObj);
        map.put("list", list);
        return ApiResponse.returnSuccess(map);
    }


    /**
     * 获取碎片详细信息
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:read" )
    @RequestMapping(value = "/findFragment", method = RequestMethod.GET)
    public String fragment(@RequestParam(value = "id") Long id){
        Fragment fragment = fragmentBiz.findFragment(id);
        return ApiResponse.returnSuccess(fragment);
    }

    /**
     * 删除碎片
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:delete" )
    @RequestMapping(value = "/delFragment", method = RequestMethod.GET)
    public String delFragment(HttpServletRequest request, @RequestParam(value = "id") Long id){
        fragmentBiz.delFragment(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }

    /**
     * 编辑碎片
     * @param request
     * @param id
     * @param values
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:edit" )
    @RequestMapping(value = "/editFragment", method = RequestMethod.POST)
    public String editFragment(HttpServletRequest request,
                               @RequestPart(value = "id") Long id,
                               @RequestPart(value = "values") String[] values){
        Fragment fragment = fragmentBiz.findFragment(id);
        if(fragment == null){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_NOT_FOUND);
        }
        List<String> list = FragmentUtil.getKey(fragment.getFragmentModel(), RegexNumEnum.REGEX_ALL);
        if(list == null || list.size()!=values.length){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_LENGTH);
        }
        fragment.setLastModifyUserId(getCurrentUserId(request));
        for(int i=0; i<list.size(); i++){
            fragment.setFragmentContent(fragment.getFragmentModel().replace(list.get(i), values[i]));
        }
        fragmentBiz.editFragment(fragment);
        return ApiResponse.returnSuccess();
    }

    /**
     * 碎片模版Map
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:read" )
    @RequestMapping(value = "/fragmentMap", method = RequestMethod.GET)
    public String fragmentMap(HttpServletRequest request,
                                @RequestPart(value = "id") Long id){
        Fragment fragment = fragmentBiz.findFragment(id);
        if(fragment == null){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_NOT_FOUND);
        }
        Map<String,String> map = new HashMap<String, String>();
        List<String> keys = FragmentUtil.getKey(fragment.getFragmentModel(), RegexNumEnum.REGEX_MATCHER_1);
        if(StringUtils.isEmpty(keys)){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_MODEL);
        }
        List<String> values = FragmentUtil.getVal(fragment.getFragmentModel(), fragment.getFragmentContent());
        if(StringUtils.isEmpty(values)){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_MODEL);
        }
        for(int i = 0; i<keys.size(); i++) {
            map.put(keys.get(i), values.get(i));
        }
        return ApiResponse.returnSuccess(map);
    }

    /**
     * 修改碎片
     * @param request
     * @param id
     * @param fragmentClassifyId
     * @param fragmentName
     * @param fragmentModel
     * @param sortNum
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:update" )
    @RequestMapping(value = "/updateFragment", method = RequestMethod.POST)
    public String updateFragment(HttpServletRequest request,
                                 @RequestPart(value = "id") Long id,
                                 @RequestPart(value = "fragmentClassifyId") Long fragmentClassifyId,
                                 @RequestPart(value = "fragmentName") String fragmentName,
                                 @RequestPart(value = "fragmentModel") String fragmentModel,
                                 @RequestPart(value = "sortNum") Integer sortNum){
        Fragment fragment = fragmentBiz.findFragment(id);
        if(fragment == null){
            return ApiResponse.returnFail(StaticContants.ERROR_FRAGMENT_NOT_FOUND);
        }
        fragment.setFragmentName(fragmentName);
        fragment.setFragmentClassifyId(fragmentClassifyId);
        fragment.setFragmentModel(fragmentModel);
        fragment.setSortNum(sortNum);
        fragment.setLastModifyUserId(getCurrentUserId(request));
        fragmentBiz.updateFragment(fragment);
        return ApiResponse.returnSuccess();
    }


    /**
     * 创建碎片信息
     * @param request
     * @param fragmentClassifyId
     * @param fragmentName
     * @param fragmentModel
     * @param sortNum
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragment:write" )
    @RequestMapping(value = "/createFragment", method = RequestMethod.GET)
    public String createFragment(HttpServletRequest request,
                                 @RequestPart(value = "fragmentClassifyId") Long fragmentClassifyId,
                                 @RequestPart(value = "fragmentName") String fragmentName,
                                 @RequestPart(value = "fragmentModel") String fragmentModel,
                                 @RequestPart(value = "sortNum") Integer sortNum){
        Fragment fragment = new Fragment();
        fragment.setFragmentName(fragmentName);
        fragment.setFragmentClassifyId(fragmentClassifyId);
        fragment.setFragmentModel(fragmentModel);
        fragment.setSortNum(sortNum);
        fragment.setLastModifyUserId(getCurrentUserId(request));
        fragmentBiz.updateFragment(fragment);
        return ApiResponse.returnSuccess();
    }

    /**
     * 碎片编辑的历史纪录［分页查询］
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragmenthistory:read" )
    @RequestMapping(value = "/listHistory", method = RequestMethod.GET)
    public String listHistory(@RequestParam(value = "page",defaultValue = "1") Integer page,
                              @RequestParam(value="pageSize",required = false)Integer pageSize,
                              @RequestParam(value = "fid") Long fid){
        Page pageObj = new Page(page, pageSize);
        List<FragmentHistory> list = fragmentBiz.listHistory(fid, pageObj);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", pageObj);
        map.put("list", list);
        return ApiResponse.returnSuccess(map);
    }

    /**
     * 分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragmentclassify:read")
    @RequestMapping(value = "/listClassify", method = RequestMethod.GET)
    public String listClassify(){
        List<FragmentClassify> list = fragmentBiz.listClassify();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 创建分类。
     * @param request
     * @param classifyName
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragmentclassify:write")
    @RequestMapping(value = "/createClassify", method = RequestMethod.POST)
    public String createClassify(HttpServletRequest request, @RequestPart("classifyName") String classifyName){
        FragmentClassify classify = new FragmentClassify();
        classify.setLastModifyUserId(getCurrentUserId(request));
        classify.setClassifyName(classifyName);
        fragmentBiz.saveClassify(classify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 分类修改
     * @param request
     * @param classifyName
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragmentclassify:update")
    @RequestMapping(value = "/updateClassify", method = RequestMethod.POST)
    public String updateClassify(HttpServletRequest request, @RequestPart("classifyName") String classifyName,
                                 @RequestPart("id") Long id){
        FragmentClassify classify = new FragmentClassify();
        classify.setId(id);
        classify.setLastModifyUserId(getCurrentUserId(request));
        classify.setClassifyName(classifyName);
        fragmentBiz.saveClassify(classify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除分类。
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "fragmentclassify:delete")
    @RequestMapping(value = "/delClassify", method = RequestMethod.GET)
    public String delClassify(HttpServletRequest request, @RequestPart("id") Long id){
        fragmentBiz.delClassify(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }

}
