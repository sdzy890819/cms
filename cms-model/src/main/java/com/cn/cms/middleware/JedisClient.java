package com.cn.cms.middleware;

import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisSentinelPool;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by zhangyang on 16/11/10.
 */
@Component
public class JedisClient {

    @Resource
    private JedisSentinelPool jedisPool;

    /**
     * 获取对应的Value
     * @param key
     * @return
     */
    public String get(String key){
        String str = null;
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            str = client.get(key);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return str;
    }

    /**
     * 批量获取
     * @param keys
     * @return
     */
    public List<String> mget(String... keys) {
        List<String> str = null;
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            str = client.mget(keys);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return str;
    }

    /**
     * 设置
     * @param key
     * @param value
     */
    public void set(String key,String value) {
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.set(key, value);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    public void set(Map<String,String> map){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            Iterator<Map.Entry<String,String>> it = map.entrySet().iterator();
            while(it.hasNext()) {
                Map.Entry<String, String> entry = it.next();
                client.set(entry.getKey(), entry.getValue());
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 设置有效时间 秒
     * @param key
     * @param value
     * @param seconds
     */
    public void set(String key,String value,int seconds) {
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.set(key, value);
            client.expire(key, seconds);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 删除KEY
     * @param key
     */
    public void del(String key){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.del(key);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }


    public void incrBy(String key, long size) {
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.incrBy(key, size);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 添加key(键)、value(值)、scope（排序字段）。
     * @param key
     * @param value
     * @param scope
     */
    public void zadd(String key,String value,long scope){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.zadd(key, scope, value);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 批量插入
     * @param key
     * @param map
     */
    public void zadd(String key, Map<String, Double> map){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.zadd(key, map);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 批量插入 设置时间
     * @param key
     * @param map
     */
    public void zadd(String key, Map<String, Double> map, int seconds){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.zadd(key, map);
            client.expire(key, seconds);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }


    /**
     * 把传递过来的N个Key进行交集计算并写入dstKey里面.
     * @param dstkey
     * @param keys
     */
    public void zunionstore(String dstkey,String... keys){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            client.zunionstore(dstkey, keys);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
    }

    /**
     * 根据scope从大到小进行排列查询
     * @param key
     * @param start
     * @param end
     * @return
     */
    public Set<String> zrevrange(String key,int start,int end){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            Set<String> set = client.zrevrange(key, start, end);
            return set ;
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return null;
    }


    public Set<String> zrevrangeByScore(String key,long max,long min){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            Set<String> set = client.zrevrangeByScore(key, max, min);
            return set ;
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return null;
    }

    /**
     * 根据最大到最小取最近count条返回Set
     * @param key
     * @param max
     * @param min
     * @param offset
     * @param count
     * @return
     */
    public Set<String> zrevrangeByScore(String key, long max, long min, int offset, int count){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            Set<String> set = client.zrevrangeByScore(key, max, min, offset, count);
            return set ;
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return null;
    }

    /**
     * 删除根据Score
     * @param key
     * @param max
     * @param min
     * @return
     */
    public long zremrangeByScore(String key,long max,long min){
        Jedis client = null;
        try{
            client = jedisPool.getResource();
            long  a = client.zremrangeByScore(key, min, max);
            return a;
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return 0;
    }
    /**
     * 获取长度
     * @param key
     * @return
     */
    public long len(String key){
        Jedis client = null;
        long p = 0;
        try{
            client = jedisPool.getResource();
            p = client.zcard(key);
            return p ;
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return p;
    }

    /**
     * 有效时间
     * @param key
     * @param seconds
     * @return
     */
    public long expri(String key,int seconds){
        Jedis client = null;
        long p = 0;
        try{
            client = jedisPool.getResource();
            p = client.expire(key, seconds);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return p;
    }

    /**
     * 获取元素是否存在
     * @param key
     * @param member
     * @return
     */
    public long zrank(String key, String member){
        Jedis client = null;
        long p = 0;
        try{
            client = jedisPool.getResource();
            p = client.zrank(key, member);
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(client!=null){
                client.close();
            }
        }
        return p;
    }

}
