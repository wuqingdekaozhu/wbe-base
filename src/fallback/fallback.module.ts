import { Module } from '@nestjs/common';
import { FallbackController } from './fallback.controller';

@Module({
  imports: [],
  controllers: [FallbackController],
  providers: [],
})
export class FallbackModule {}
