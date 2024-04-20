import { Injectable, OnModuleInit } from '@nestjs/common'
// PrismaClient 要先執行 npx prisma generate 指令 
import { PrismaClient } from '@prisma/client'
// nest g service database
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect()
  }
}
