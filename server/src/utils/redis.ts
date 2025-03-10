import redis from 'redis';
import { error, info } from './logger';

export let redisClient:any = null;

export const connectRedis = async () => {
    redisClient = redis.createClient();
     await redisClient.connect();
    info('Created client: '+ JSON.stringify(redisClient));
    redisClient.on('connec',()=> info('Connection: '+ redisClient));
    redisClient.on('error', (err:any) => error('Redis Error: '+ err));
}

// export const getRedisCliten = () => {
//     info('Redis client: '+ JSON.stringify(redisClient));
//     if(redisClient) return redisClient;
// }