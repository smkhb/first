import { CacheRepo } from '../cache-repo'
import { RedisService } from './redis.service'

export class RedisCacheRepo implements CacheRepo {
  constructor(private redis: RedisService) {}

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15) // 15 minutes
  }
  get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }
  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
