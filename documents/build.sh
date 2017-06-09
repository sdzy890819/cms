#!/bin/bash
cd /data/source/cms
echo "----------------------- Git Pull       ------------------------"
git pull
echo "----------------------- Mvn Package    ------------------------"
mvn clean package -e
echo "----------------------- Operation Copy ------------------------"

if [ ! -d "/data/projects/cms-app/" ]; then
	echo "-----创建cms-app目录-----"
	mkdir /data/projects/cms-app
fi

cd /data/projects/cms-app/
jar -xvf /data/source/cms/cms-app/target/cms-app.war

if [ ! -d "/data/projects/cms-web/" ]; then
	echo "----- 创建cms-web目录 -----"
	mkdir /data/projects/cms-web
fi

cd /data/projects/cms-web/
jar -xvf /data/source/cms/cms-web/target/cms-web.war

if [ ! -d "/data/projects/cms-publish/" ]; then
	echo "-----创建cms-publish目录-----"
	mkdir /data/projects/cms-publish
fi

cp -rf /data/source/cms/cms-publish/target/cms-publish.jar /data/projects/cms-publish/
cp -rf /data/source/cms/html/dist/* /data/html
cp -rf /data/source/cms/mobile-html/build/* /data/mobile-html

cp -rf /data/source/cms/cms-model/src/sh/* /data/sh/

if [ ! -d "/data/projects/instance/cms-web-tomcat" ]; then
	echo "-----创建cms-web-tomcat目录-----"
	mkdir /data/projects/instance/cms-web-tomcat
fi

if [ ! -d "/data/projects/instance/cms-app-tomcat" ]; then
	echo "-----创建cms-app-tomcat目录-----"
	mkdir /data/projects/instance/cms-app-tomcat
fi

echo "----------------------- Copy Tomcat Start ------------------------"
cp -rf /data/source/cms/tomcat/* /data/projects/instance/cms-web-tomcat

cp -rf /data/source/cms/tomcat/* /data/projects/instance/cms-app-tomcat

cp -rf /data/source/cms/cms-web/src/conf/* /data/projects/instance/cms-web-tomcat/conf/

cp -rf /data/source/cms/cms-app/src/conf/* /data/projects/instance/cms-app-tomcat/conf/




echo "#!/bin/bash" > /data/projects/instance/cms-web-tomcat/exec.sh
echo "export CATALINA_BASE=\"/data/projects/instance/cms-web-tomcat\"" >> /data/projects/instance/cms-web-tomcat/exec.sh
echo "export CATALINA_PID=\"/data/projects/instance/cms-web-tomcat/pid\"" >> /data/projects/instance/cms-web-tomcat/exec.sh
echo "export JAVA_OPTS=\"-Xms800m -Xmx800m -XX:+HeapDumpOnOutOfMemoryError\"" >> /data/projects/instance/cms-web-tomcat/exec.sh
echo "/usr/local/tomcat/bin/catalina.sh \$1" >> /data/projects/instance/cms-web-tomcat/exec.sh

chmod +x /data/projects/instance/cms-web-tomcat/exec.sh

echo "#!/bin/bash" > /data/projects/instance/cms-app-tomcat/exec.sh
echo "export CATALINA_BASE=\"/data/projects/instance/cms-app-tomcat\"" >> /data/projects/instance/cms-app-tomcat/exec.sh
echo "export CATALINA_PID=\"/data/projects/instance/cms-app-tomcat/pid\"" >> /data/projects/instance/cms-app-tomcat/exec.sh
echo "export JAVA_OPTS=\"-Xms800m -Xmx800m -XX:+HeapDumpOnOutOfMemoryError\"" >> /data/projects/instance/cms-app-tomcat/exec.sh
echo "/usr/local/tomcat/bin/catalina.sh \$1" >> /data/projects/instance/cms-app-tomcat/exec.sh

chmod +x /data/projects/instance/cms-app-tomcat/exec.sh

echo "----------------------- Copy Tomcat Finish ------------------------"
echo "----------------------- Project Restart    ------------------------"

sh /data/projects/instance/cms-web-tomcat/exec.sh stop
sleep 3s
sh /data/projects/instance/cms-web-tomcat/exec.sh start

sh /data/projects/instance/cms-app-tomcat/exec.sh stop
sleep 3s
sh /data/projects/instance/cms-app-tomcat/exec.sh start

echo "----------------------- Project Restart Finish ------------------------"

echo "----------------------- Java Jar Restart       ------------------------"
cd /data/projects/cms-publish/

kill -9 $(ps -ef|grep "java -Xms1500m -Xmx1500m -XX:+HeapDumpOnOutOfMemoryError -jar cms-publish.jar"|gawk '$0 !~/grep/ {print $2}' |tr -s '\n' ' ')

java -Xms1500m -Xmx1500m -XX:+HeapDumpOnOutOfMemoryError -jar  cms-publish.jar >> /data/logs/cms-publish/catalina.out 2>&1 &
