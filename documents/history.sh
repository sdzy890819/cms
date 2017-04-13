#!/bin/bash
##Auth:潍坊华盛信息科技有限公司.
##备份operation_history表
USERNAME=root
PWD=
DATABASE=quanjing
DATE_STR=`date +"%Y%m%d"`
NEWTABLENAME="operation_history_$DATE_STR"
COMMAND_1="
use $DATABASE;
DROP TABLE IF EXISTS $NEWTABLENAME;
alter table operation_history rename $NEWTABLENAME;
CREATE TABLE operation_history select * from $NEWTABLENAME where 1=2;
alter table operation_history CHANGE COLUMN id id bigint(20) NOT NULL AUTO_INCREMENT COMMENT \"主键ID。\",ADD PRIMARY KEY (id);
"
echo "TABLE operation_history BACKUPS start..."
echo "exec:"
echo "----------------------------------"
echo "$COMMAND_1"
echo "----------------------------------"
if [ ! -n "$PWD" ]; then 
	mysql -u$USERNAME -e"$COMMAND_1"
else
	mysql -u$USERNAME -p$PWD -e"$COMMAND_1"
fi
echo "TABLE operation_history BACKUPS end!"
######删除多余的表
COMMAND_2="
		use $DATABASE;
	"	
if [ ! -n "$PWD" ]; then 
	OPERATION_LIST=`mysql -u$USERNAME -e"USE $DATABASE; SHOW TABLES LIKE 'operation_history_%';" |grep "operation_history_[0-9]"|sort -r|sed -n '3,$p'`

else
	OPERATION_LIST=`mysql -u$USERNAME -p$PWD -e"USE $DATABASE; SHOW TABLES LIKE 'operation_history_%';" |grep "operation_history_[0-9]"|sort -r|sed -n '3,$p'`
fi

for line in $OPERATION_LIST
do
	COMMAND_2="$COMMAND_2
		drop table $line;
		"	
done
echo "BACKUP TABLE operation_history DELETE START"
echo "exec:"
echo "----------------------------------"
echo "$COMMAND_2"
echo "----------------------------------"
if [ ! -n "$PWD" ]; then 
	mysql -u$USERNAME -e"$COMMAND_2"
else
	mysql -u$USERNAME -p$PWD -e"$COMMAND_2"
fi
echo "BACKUP TABLE operation_history DELETE END"

