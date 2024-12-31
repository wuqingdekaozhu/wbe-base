import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralException } from 'src/common/exceptions/exception';
import { User } from 'src/common/entities/user.entity';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @Get()
  async getAllUsers(): Promise<Partial<User>[]> {
    try {
      const users = await this.userRepository.find();
      let usersData: Partial<User>[] = [];
      for (let user of users) {
        const { isActive, deleted, password, ...data } = user;
        usersData.push(data);
      }
      return usersData;
    } catch {
      throw new GeneralException(500, '5111', 'failed to get users');
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Partial<User> | null> {
    try {
      const user = await this.userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return user;
      const { isActive, deleted, password, ...data } = user;
      return data;
    } catch {
      throw new GeneralException(500, '5121', 'failed to get user');
    }
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const user = this.userRepository.create({ username: createUserDto.username, password: createUserDto.password });
      const { isActive, deleted, password, ...data } = await this.userRepository.save(user);
      return data;
    } catch {
      throw new GeneralException(500, '5131', 'failed to create user');
    }
  }
}
