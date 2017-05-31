package com.cn.cms.dao;

import com.cn.cms.bo.TemplateSearch;
import com.cn.cms.po.Template;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface TemplateDao {

    Integer queryTemplateCount();

    List<Template> queryTemplateList(@Param(value = "page") Page page);

    Integer searchTemplateCount(@Param(value = "p1") TemplateSearch templateSearch);

    List<Template> searchTemplate(@Param(value = "p1") TemplateSearch templateSearch, @Param(value = "page") Page page);

    void delTemplate(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveTemplate(@Param(value = "p1") Template template);

    Integer queryFilenameAndPathCount(@Param(value = "p1") Template template);

    void updateTemplate(@Param(value = "p1") Template template);

    Template getTemplate(@Param(value = "id") Long id);

    List<Template> findTemplateListByRelation(@Param(value = "relationId") Long relationId,
                                              @Param(value = "relationType") Integer relationType,
                                              @Param(value = "job") int job);

    List<Template> findTemplateListByRelationNotDetail(@Param(value = "relationId") Long relationId,
                                              @Param(value = "relationType") Integer relationType,
                                              @Param(value = "job") int job);


    List<Template> findTemplateListByNewsPushColumnAndNotDetail(@Param(value = "newsId") Long newsId,
                                                          @Param(value = "relationType") Integer relationType,
                                                          @Param(value = "job") int job);

    void publishTemplate(@Param(value = "list") List<Long> list,
                         @Param(value = "publish") int publish);

    List<Template> findTemplateListByAuto(@Param(value = "templateClassify") int templateClassify,
                                          @Param(value = "job") int job);

    Template findTemplateByChannel(@Param(value = "channelId") Long channelId,
                                   @Param(value = "templateClassify") Integer templateClassify,
                                   @Param(value = "relationId") Long relationId,
                                   @Param(value = "relationType") Integer relationType,
                                   @Param(value = "job") int job);

    Template findTemplateList(@Param(value = "channelId") Long channelId,
                              @Param(value = "templateClassify") Integer templateClassify,
                              @Param(value = "job") int job);

    void uploadTemplate(@Param(value = "lastModifyUserId") String lastModifyUserId,
                        @Param(value = "id") Long id,
                        @Param(value = "upload") Integer upload);

}
