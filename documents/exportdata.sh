#!/bin/bash
###使用说明：
###1. 首先修改exportdata.sql内的数据库信息。
###2. 按照需要编辑textexport.sh 文件，添加执行命令。并编辑导出的栏目、新闻状态及时间范围。
###3. 执行text.export.sh即可。
###每次执行所有的sql文件都会存储到SQLFILE_NEWS、SQLFILE_NEWS_DETAIL、SQLFILE_NEWS_STOCK变量约定的文件路径下。
###shell脚本执行完成以后。入库操作即完成。。如果需要elasticsearch需要检索这些数据的话。则执行之前提供的elasticsearch更新接口（/webapi/test/reBuildES?p=数量,）即会更新最新的p条数据。

##接受传递参数
fromDocChannel=$1
toCategory=$2
toChannel=$3
toColumn=$4
fromStartTime=$5
fromEndTime=$6
fromStatus=$7
##如果状态为空则默认为10
if [ ! -n $fromStatus ]; then
        echo "默认状态为10"
        fromStatus="10"
fi
##来源数据库信息，根据情况修改
FROMSQLUSER="cms-p5wc"
FROMSQLPASSWORD="cms-p5wc"
FROMSQLIP="127.0.0.1"
FROMSQLPORT="3306"
FROMSQLNAME="test"


##导入数据库信息.根据情况修改
TOSQLUSER="cms-p5wc"
TOSQLPASSWORD="cms-p5wc"
TOSQLIP="127.0.0.1"
TOSQLPORT="3306"
TOSQLNAME="quanjing"

SQLFILE_NEWS="/data/sh/news.$fromDocChannel.sql"
SQLFILE_NEWS_DETAIL="/data/sh/news_detail.$fromDocChannel.sql"
SQLFILE_NEWS_STOCK="/data/sh/news_stock.$fromDocChannel.sql"
SQLFILE_NEWS_PUSH_COLUMN="/data/sh/news_push_column.$fromDocChannel.sql"

##########
dumpsql_1=""
dumpsql_2=""
dumpsql_3=""
echo $dumpsql_1
echo "开始执行导出"
echo "执行导出sql-1"
`mysql -h $FROMSQLIP -P $FROMSQLPORT -u$FROMSQLUSER -p$FROMSQLPASSWORD $FROMSQLNAME --column-names=false -e "select CONCAT(\"insert into news values ('\",IFNULL(DOCID,''),\"', \",IF(ISNULL(CRTIME),'null',CONCAT('\\'',CRTIME,'\\'')),\", \",IF(ISNULL(DOCRELTIME),'null',CONCAT('\\'',DOCRELTIME,'\\'')),\", '1', '\",IFNULL(DOCTITLE,''),\"', '', '\",IFNULL(REPLACE(IFNULL(DOCKEYWORDS,''),';',','),''),\"', '\",IFNULL(LEFT(REPLACE(DOCCONTENT,'\\'','\"'),200),''),\"', '\",IFNULL(DOCSOURCENAME,''),\"', '\",IFNULL(DOCAUTHOR,''),\"', \",IF(ISNULL(CRTIME),'null',CONCAT('\\'',CRTIME,'\\'')),\", \",IF(ISNULL(DOCPUBTIME),'null',CONCAT('\\'',DOCPUBTIME,'\\'')),\", '$toChannel', '$toColumn', '100000000000000001', '100000000000000001', '100000000000000001', '1', '\",IFNULL(DOCPUBURL,''),\"', '\",IFNULL(SUBSTR(DOCPUBURL FROM POSITION('20' IN DOCPUBURL)),''),\"', '\",if(isnull(DOCPUBURL),0,1),\"', null, null, null, null, null, '1', null, '$toCategory', '0', null, null, null, null, null, null, null, \",IF(ISNULL(DOCPUBTIME),'null',CONCAT('\\'',DOCPUBTIME,'\\'')),\", '100000000000000001', '\",IFNULL(STOCKCODE,''),\"', null, '\",if(isnull(STOCKCODE),0,1),\"', null);\") from wcmdocument where DOCSTATUS in ($fromStatus) and CRTIME >= FROM_UNIXTIME($fromStartTime) and CRTIME <=FROM_UNIXTIME($fromEndTime) and DOCCHANNEL in ($fromDocChannel);" > $SQLFILE_NEWS`
echo "执行导出sql-2"
`mysql -h $FROMSQLIP -P $FROMSQLPORT -u$FROMSQLUSER -p$FROMSQLPASSWORD $FROMSQLNAME --column-names=false -e "select CONCAT(\"insert into news_detail values (null,\",IF(ISNULL(CRTIME),'null',CONCAT('\\'',CRTIME,'\\'')),\",\",IF(ISNULL(DOCRELTIME),'null',CONCAT('\\'',DOCRELTIME,'\\'')),\",'1','\",REPLACE(DOCHTMLCON,'\\'','\"'),\"','\",IFNULL(DOCID,''),\"','100000000000000001','100000000000000001');\") from wcmdocument where DOCSTATUS in ($fromStatus) and CRTIME >= FROM_UNIXTIME($fromStartTime) and CRTIME <=FROM_UNIXTIME($fromEndTime) and DOCCHANNEL in ($fromDocChannel)  ;" > $SQLFILE_NEWS_DETAIL`
echo "执行导出sql-3"
`mysql -h $FROMSQLIP -P $FROMSQLPORT -u$FROMSQLUSER -p$FROMSQLPASSWORD $FROMSQLNAME --column-names=false -e "select CONCAT(\"insert into news_stock values (null,\",IF(ISNULL(CRTIME),'null',CONCAT('\\'',CRTIME,'\\'')),\",\",IF(ISNULL(DOCRELTIME),'null',CONCAT('\\'',DOCRELTIME,'\\'')),\",'1','100000000000000001','\",IFNULL(STOCKCODE,''),\"',null,'\",IFNULL(DOCID,''),\"','100000000000000001');\") from wcmdocument where DOCSTATUS in ($fromStatus) and CRTIME >= FROM_UNIXTIME($fromStartTime) and CRTIME <=FROM_UNIXTIME($fromEndTime) and DOCCHANNEL in ($fromDocChannel) and STOCKCODE is not null and STOCKCODE !='' ;" > $SQLFILE_NEWS_STOCK`
echo "执行到处sql-4"
`mysql -h $FROMSQLIP -P $FROMSQLPORT -u$FROMSQLUSER -p$FROMSQLPASSWORD $FROMSQLNAME --column-names=false -e "select CONCAT(\"insert into news_push_column values (null,\",IF(ISNULL(CRTIME),'null',CONCAT('\\'',CRTIME,'\\'')),\",\",IF(ISNULL(DOCRELTIME),'null',CONCAT('\\'',DOCRELTIME,'\\'')),\",'1','\",IFNULL(DOCID,''),\"','100000000000000001','100000000000000001' ,'$toChannel', '$toColumn', null, '0');\") from wcmdocument where DOCSTATUS in ($fromStatus) and CRTIME >= FROM_UNIXTIME($fromStartTime) and CRTIME <=FROM_UNIXTIME($fromEndTime) and DOCCHANNEL in ($fromDocChannel)  ;" > $SQLFILE_NEWS_PUSH_COLUMN`
echo "结束执行导出"


echo "开始执行导入"
echo "执行导入sql-1"
`mysql -h $TOSQLIP -P $TOSQLPORT -u$TOSQLUSER -p$TOSQLPASSWORD $TOSQLNAME < $SQLFILE_NEWS`
echo "执行导入sql-2"
`mysql -h $TOSQLIP -P $TOSQLPORT -u$TOSQLUSER -p$TOSQLPASSWORD $TOSQLNAME < $SQLFILE_NEWS_DETAIL`
echo "执行导入sql-3"
`mysql -h $TOSQLIP -P $TOSQLPORT -u$TOSQLUSER -p$TOSQLPASSWORD $TOSQLNAME < $SQLFILE_NEWS_STOCK`
echo "结束执行导入"

