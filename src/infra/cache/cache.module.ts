import { EnvModule } from '@/infra/env/env.module'
import { Module } from '@nestjs/common'
import { CacheRepo } from './cache-repo'
import { RedisCacheRepo } from './redis/redis-cache-repo'
import { RedisService } from './redis/redis.service'

@Module({
  imports: [EnvModule],
  providers: [RedisService, { provide: CacheRepo, useClass: RedisCacheRepo }],
  exports: [CacheRepo],
})
export class CacheModule {}
