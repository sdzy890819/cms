package com.cn.cms.middleware;

import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.utils.StringUtils;
import lombok.Getter;
import lombok.Setter;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

/**
 * Created by zhangyang on 17/1/5.
 */
@Getter
@Setter
public class ESearchClient {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    private TransportClient client;

    private List<String> clusterList;






    /**
     * 初始化
     */
    public void open(){
        try {
            Settings settings = Settings.builder()
                    .put("client.transport.sniff", true)
                    .put("client.transport.ping_timeout", "10s").build();
            this.client = new PreBuiltTransportClient(settings);
            if(clusterList!=null){
                for(int i=0; i<clusterList.size(); i++){
                    String items = clusterList.get(i);
                    if(StringUtils.isNotBlank(items)){
                        String[] item = items.split(":");
                            this.client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(item[0]),Integer.parseInt(item[1])));
                    }
                }
            }
        } catch (UnknownHostException e) {
            log.error(e);
        }
    }

    /**
     * 销毁
     */
    public void close(){
        if (this.client == null) {
            return;
        }
        this.client.close();
        this.client = null;
    }

}
