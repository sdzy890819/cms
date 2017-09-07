#!/bin/bash
###需要传递一共7个参数
##参数1 是导出数据库的新闻栏目id 如果多个用逗号进行分割。注意前后不可以 以逗号开头和结尾 多个id的正确使用比如：1213,1214 
##参数2 是导入的部门id。
##参数3 是导入的频道id。
##参数4 是导入的栏目id。
##参数5 是导出数据库的新闻 的开始创建时间 时间戳 单位是秒
##参数6 是导出数据库的新闻 的结束创建时间 时间戳 单位是秒
##参数7 是导出数据库的新闻 的新闻状态。如果多个用逗号进行分割。注意前后不可以 以逗号开头和结尾 多个id的正确使用比如：10,20,0,-1
##参数1、5、6、7 最终会得到完整的where条件 条件：where DOCSTATUS in ($fromStatus) and CRTIME >= FROM_UNIXTIME($fromStartTime) and CRTIME <=FROM_UNIXTIME($fromEndTime) and DOCCHANNEL in ($fromDocChannel)

sh exportdata.sh 1213 10000 10000 10006 1454378400 1486000800 10