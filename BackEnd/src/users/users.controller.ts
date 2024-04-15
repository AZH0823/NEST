import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
// ParseIntPipe 數字驗證 https://docs.nestjs.com/pipes
import { UsersService } from './users.service'
// https://[domain]/user /user 路由控制器
// nest g controller users

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  // 實體化 UsersService
  constructor(private readonly userService: UsersService) {}

  @Get() // users/
  findAll(@Query('role') role:'INTERN' | 'ENGINEER' | 'ADMIN') {
    // 你的逻辑代码，例如：返回所有用户列表
    return this.userService.findAll(role)
  }
  @Get('inters') // users/inters
  findAllInters() {
    return []
  }

  // 根据ID获取单个用户的信息
  @Get(':id') // get users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // 你的逻辑代码，例如：返回ID匹配的用户
    return this.userService.findOne(id)
  }

  // 创建一个新用户
  @Post() // post /users/
  create(@Body() creatUserDto: CreateUserDto) {
    // 你的逻辑代码，例如：保存用户数据，并返回创建的用户
    return this.userService.create(creatUserDto)
  }

  // 根据ID更新用户的信息
  @Patch(':id') // patch users/:id
  update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto) {
    // 你的逻辑代码，例如：更新用户数据，并返回更新后的用户信息
    return this.userService.update(id, userUpdate)
  }

  // 根据ID删除一个用户
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // 你的逻辑代码，例如：删除用户，并返回一些状态信息
    return this.userService.remove(id)
  }
}
