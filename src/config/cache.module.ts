import { CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
  ],
})
export class CachesModule {}
