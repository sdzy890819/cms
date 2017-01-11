#!/bin/bash
cd /data/source/cms
echo "----------------------------------------------------"
echo "-----------------------git pull------------------------"
echo "----------------------------------------------------"
git pull
echo "----------------------------------------------------"
echo "-----------------------mvn package------------------------"
echo "----------------------------------------------------"
mvn clean package -e 
echo "----------------------------------------------------"
echo "-----------------------operation copy------------------------"
echo "----------------------------------------------------"
cd /data/projects/cms-web/
jar -xvf /data/source/cms/cms-web/target/cms-web.war 
cp -rf /data/source/cms/cms-publish/target/cms-publish.jar /data/projects/cms-publish/
cp -rf /data/source/cms/html /data/
echo "----------------------------------------------------"
echo "-----------------------project restart------------------------"
echo "----------------------------------------------------"
/usr/local/tomcat/bin/catalina.sh stop 
sleep 2s
ABC=`ps -af |grep "tomcat" |grep "java" |awk '{print $2}'`
if [[ $ABC > 0 ]]
then
	kill -9 $ABC
fi
/usr/local/tomcat/bin/catalina.sh start

echo "----------------------------------------------------"
echo "-----------------------java jar restart------------------------"
echo "----------------------------------------------------"
cd /data/projects/cms-publish/
ABC = `ps -af|grep "cms-publish" |grep "java" |awk '{print $2}'`
if [[ $ABC > 0 ]]
then
	kill -9 $ABC
fi
java -jar cms-publish.jar >/data/logs/cms-publish/catalina.out &
