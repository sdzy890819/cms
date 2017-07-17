package com.cn.cms.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 17/5/11.
 */
public class TextUtils {


    public static List<NewsStock> getNewsStock(String content, String lastModifyUserId, Long newsId, News news){
        List<String> list = HtmlUtils.matcher(content);
        Map<String, NewsStock> result = new HashMap<>();
        List<NewsStock> resultList = null;
        if(StringUtils.isNotBlank(news.getStockCode())){
            NewsStock newsStock = new NewsStock();
            newsStock.setLastModifyUserId(lastModifyUserId);
            newsStock.setCreateUserId(lastModifyUserId);
            newsStock.setNewsId(newsId);
            newsStock.setStockCode(news.getStockCode());
            newsStock.setStockName(news.getStockName());
            result.put(newsStock.getStockCode(), newsStock);
        }
        if(StringUtils.isNotEmpty(list)) {
            for (int i = 0; i < list.size(); i++) {
                String[] tmps = list.get(i).split(StaticContants.REGEX_SPLIT_STOCK);
                if(tmps.length == 2 && StringUtils.isNotBlank(tmps[0])) {
                    NewsStock newsStock = new NewsStock();
                    newsStock.setLastModifyUserId(lastModifyUserId);
                    newsStock.setCreateUserId(lastModifyUserId);
                    newsStock.setNewsId(newsId);
                    newsStock.setStockCode(tmps[0]);
                    newsStock.setStockName(tmps[1]);
                    result.put(newsStock.getStockCode(), newsStock);
                }
            }
            resultList = new ArrayList<>(result.values());
            if(StringUtils.isBlank(news.getStockCode())&&resultList.size()>0){
                news.setStockCode(resultList.get(0).getStockCode());
                news.setStockName(resultList.get(0).getStockName());
            }
        }
        return resultList;
    }

    /**
     * 初始化PushColumn
     * @param news
     * @return
     */
    public static List<NewsPushColumn> packagingNewsPushColumns(News news){
        Map<String, NewsPushColumn> map = new HashMap<>();
        JSONArray columnIds = news.getColumnIds();
        NewsPushColumn firstColumn = new NewsPushColumn();
        firstColumn.setNewsId(news.getId());
        firstColumn.setChannelId(news.getChannelId());
        firstColumn.setColumnId(news.getColumnId());
        firstColumn.setCreateUserId(news.getLastModifyUserId());
        firstColumn.setLastModifyUserId(news.getLastModifyUserId());
        firstColumn.setPushColumn(NewsPushColumn.PushColumn.NO.getTab());
        map.put(String.valueOf(news.getColumnId()), firstColumn);
        if(columnIds!=null && columnIds.size()>0){
            for(int i = 0; i<columnIds.size(); i++){
                String tmp[] = columnIds.getJSONObject(i).getString("val").split("-");
                if(tmp!=null && tmp.length == 2 ) {
                    NewsPushColumn newsPushColumn = new NewsPushColumn();
                    newsPushColumn.setNewsId(news.getId());
                    newsPushColumn.setChannelId(Long.parseLong(tmp[0]));
                    newsPushColumn.setColumnId(Long.parseLong(tmp[1]));
                    newsPushColumn.setCreateUserId(news.getLastModifyUserId());
                    newsPushColumn.setLastModifyUserId(news.getLastModifyUserId());
                    newsPushColumn.setPushColumn(NewsPushColumn.PushColumn.YES.getTab());
                    if(map.get(tmp[1]) == null) {
                        map.put(tmp[1], newsPushColumn);
                    }
                }
            }
        }
        if(map.size() > 0) {
            return new ArrayList<>(map.values());
        }
        return null;
    }

    public static JSONArray restoreNewsPushColumns(List<NewsPushColumn> list, Map<Long, Channel> channelMap, Map<Long, NewsColumn> newsColumnMap){
        if(StringUtils.isNotEmpty(list)){
            JSONArray jsonArray = new JSONArray();
            for(int i=0;i<list.size();i++){
                NewsPushColumn newsPushColumn = list.get(i);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("title", (channelMap.get(newsPushColumn.getChannelId())!=null?channelMap.get(newsPushColumn.getChannelId()).getChannelName():"")
                        + "-" +
                        (newsColumnMap.get(newsPushColumn.getColumnId())!=null?newsColumnMap.get(newsPushColumn.getColumnId()).getColumnName():""));
                jsonObject.put("val", newsPushColumn.getChannelId() + "-" + newsPushColumn.getColumnId());
                jsonArray.add(jsonObject);
            }
            return jsonArray;
        }
        return null;
    }

}
