#!/bin/sh
if [[ ! -n $1 ]]; then
	echo "没有传递参数1[模版存储目录下的相对文件路径],程序退出"
	exit -1 
fi

if [[ ! -n $2 ]]; then
	echo "没有传递参数2[模版存储目录],程序退出"
	exit -1 
fi
cd $2
##如果多服务器负载就添加新的rsync即可。
rsync -avRz --password-file=/etc/rsyncd.pass $1 hsrsync@120.77.220.11::template