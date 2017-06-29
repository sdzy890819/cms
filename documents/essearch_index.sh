#!/bin/bash
A=`curl -XDELETE 'http://localhost:9200/cmsindex/'`
echo "执行删除索引操作，返回：$A"
B=`curl -XPUT "http://localhost:9200/cmsindex/" -d '
{"mappings":{"news":{"properties":{"id":{"type":"long"},"title":{"type":"string","analyzer":"ik_max_word","fields":{"pinyin":{"type":"string","analyzer":"pinyin"}}},"subTitle":{"type":"string","analyzer":"ik_max_word"},"keyword":{"type":"string","analyzer":"ik_max_word"},"description":{"type":"string","analyzer":"ik_max_word"},"source":{"type":"string","analyzer":"ik_smart"},"author":{"type":"string","analyzer":"ik_smart"},"authorArray":{"type":"keyword"},"keywordArray":{"type":"keyword"},"editPublishTime":{"type":"long"},"stockArray":{"type":"keyword"},"imageUrl":{"type":"string"},"buildTime":{"type":"long"},"writeTime":{"type":"long"},"categoryId":{"type":"long"},"channelId":{"type":"long"},"columnId":{"type":"long"},"writeUserId":{"type":"string"},"buildUserId":{"type":"string"},"platform":{"type":"integer"},"url":{"type":"string"},"relativePath":{"type":"string"},"publish":{"type":"integer"},"field1":{"type":"string","analyzer":"ik_smart"},"field2":{"type":"string","analyzer":"ik_smart"},"field3":{"type":"string","analyzer":"ik_smart"},"field4":{"type":"string","analyzer":"ik_smart"},"field5":{"type":"string","analyzer":"ik_smart"},"autoPublish":{"type":"integer"},"timer":{"type":"long"},"sort":{"type":"integer"},"recommendTitle":{"type":"string","analyzer":"ik_smart"},"recommendDescription":{"type":"string","analyzer":"ik_smart"},"recommendImages":{"type":"string"},"recommendColumnId":{"type":"long"},"recommendUserId":{"type":"string"},"recommend":{"type":"integer"},"recommendTime":{"type":"long"},"content":{"type":"string","analyzer":"ik_smart"},"createTime":{"type":"long"},"updateTime":{"type":"long"},"delTag":{"type":"integer"},"lastModifyUserId":{"type":"string"},"createUserId":{"type":"string"}}},"topic":{"properties":{"id":{"type":"long"},"topicTitle":{"type":"string","analyzer":"ik_max_word","fields":{"pinyin":{"type":"string","analyzer":"pinyin"}}},"topicPath":{"type":"string"},"topicFilename":{"type":"string"},"topicClassifyId":{"type":"long"},"categoryId":{"type":"long"},"channelId":{"type":"long"},"releaseTime":{"type":"long"},"keyword":{"type":"string","analyzer":"ik_max_word"},"description":{"type":"string","analyzer":"ik_max_word"},"topicColumnId":{"type":"long"},"topicUrl":{"type":"string"},"buildUserId":{"type":"string"},"buildTime":{"type":"long"},"publish":{"type":"integer"},"createTime":{"type":"long"},"updateTime":{"type":"long"},"delTag":{"type":"integer"},"lastModifyUserId":{"type":"string"},"createUserId":{"type":"string"}}},"images":{"properties":{"id":{"type":"long"},"imageTitle":{"type":"string","analyzer":"ik_max_word","fields":{"pinyin":{"type":"string","analyzer":"pinyin"}}},"imageUrl":{"type":"string"},"imageWidthPixel":{"type":"integer"},"imageHeightPixel":{"type":"integer"},"orgWidthPixel":{"type":"integer"},"orgHeightPixel":{"type":"integer"},"uploadUserId":{"type":"string"},"uploadTime":{"type":"long"},"imagePath":{"type":"string"},"watermark":{"type":"integer"},"compress":{"type":"integer"},"platform":{"type":"integer"},"createTime":{"type":"long"},"updateTime":{"type":"long"},"delTag":{"type":"integer"},"lastModifyUserId":{"type":"string"},"createUserId":{"type":"string"}}},"video":{"properties":{"id":{"type":"long"},"videoTitle":{"type":"string","analyzer":"ik_max_word","fields":{"pinyin":{"type":"string","analyzer":"pinyin"}}},"videoDesc":{"type":"string","analyzer":"ik_smart"},"uploadUserId":{"type":"string"},"uploadTime":{"type":"long"},"videoUrl":{"type":"string"},"m3u8Url":{"type":"string"},"videoPath":{"type":"string"},"platform":{"type":"integer"},"createTime":{"type":"long"},"updateTime":{"type":"long"},"delTag":{"type":"integer"},"lastModifyUserId":{"type":"string"},"createUserId":{"type":"string"}}}}}'`
echo "执行建立索引操作，返回：$B"