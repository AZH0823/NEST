import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client'
import { Throttle, SkipThrottle } from '@nestjs/throttler' 
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { NotFoundException } from '@nestjs/common';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name)
  @Post()
  async create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  async findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for ALL Employees\t${ip}`, `$-test{EmployeesController.name}-test`)
    if(role){
      const users = this.employeesService.findAll(role)
      if((await users).length === 0) throw new NotFoundException('找不到使用者資料')
      return users
    }
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 }})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.employeesService.findOne(+id)
    if (!user) throw new NotFoundException('找不到單一使用者資料')
    return user
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    // 首先尝试查找是否存在该 ID 的员工
  const employee = await this.employeesService.findOne(+id);

  // 如果 employee 不存在，抛出自定义错误
  if (!employee) {
    throw new HttpException({
      resCode: '87',
      msg: 'test'
    },  HttpStatus.NOT_FOUND); 
    // throw new HttpException('找不到87状态', 87);  // 使用 HttpStatus 或直接数字定义错误状态码
  }
  // 如果存在，执行更新操作
  return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
