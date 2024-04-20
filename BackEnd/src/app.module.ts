import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
// nest g module module 建立名為 EmployeesModule API 模組
import { EmployeesModule } from './employees/employees.module'; 
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'; // https://nest.nodejs.cn/security/rate-limiting#multiple-throttler-definitions
@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule,
  ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit: 3,
    },{
      name: 'long',
      ttl: 60000,
      limit: 100,
    }]),],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, 
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
