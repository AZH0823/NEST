import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
// nest g module database 產生資料庫
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
