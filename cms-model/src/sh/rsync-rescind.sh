#!/bin/sh
if [[ ! -n $1 ]]; then
	echo "没有传递参数1[模块名],程序退出"
	exit -1
fi

if [[ ! -n $2 ]]; then
	echo "没有传递参数2[模块下的文件路径],程序退出"
	exit -1 
fi

if [[ ! -n $3 ]]; then
	echo "没有传递参数3[执行目录],程序退出"
	exit -1 
fi
cd $3 
if [[ $2 =~ "/" ]]; then
FILENAME=${2##*/}
RPATH=${2%/*}
echo "FILENAME: $FILENAME  RPATH: $RPATH"
rsync -avRz --delete --password-file=/etc/rsyncd.pass --include=$FILENAME --exclude=/* ./ hsrsync@120.77.220.11::$1/$RPATH
else
rsync -avRz --delete --password-file=/etc/rsyncd.pass --include=$2 --exclude=/* ./ hsrsync@120.77.220.11::$1
fi