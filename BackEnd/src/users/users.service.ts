import { Injectable } from '@nestjs/common';
// nest g controller users

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
@Injectable()
export class UsersService {
  private users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "role": "INTERN",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "role": "INTERN",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "role": "ENGINEER",
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "role": "ENGINEER",
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "role": "ADMIN",
    }
  ]
  
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    console.log(`findAll: `, this)
    if (role) {
      return this.users.filter(user=>user.role === role)
    }
    return this.users
  }
  findOne(id: number) {
    return this.users.find(user=> user.id === id)
  }
  create(createUserDto: CreateUserDto){
    const userHighID = [...this.users].sort((a, b)=>b.id - a.id)
    const newUser = {
      id: userHighID[0].id + 1,
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser
  }
  update(id: number, updateUserDto: UpdateUserDto) {
      this.users = this.users.map((user) => {
      if(user.id === id) {
        return {
          ...user, ...updateUserDto
        }
      } return user
    })
  }
  remove(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter(user=>user.id !== id)
    return removedUser
  }
}
