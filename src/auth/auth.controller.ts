import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { GeneralException } from 'src/common/exceptions/exception';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/entities/user.entity';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    if (!loginDto.username) throw new GeneralException(400, '4211', 'username required');
    if (!loginDto.password) throw new GeneralException(400, '4212', 'password required');

    const user = await this.userRepository.findOneBy({ username: loginDto.username, password: loginDto.password });

    if (!user) throw new GeneralException(403, '4213', 'invalid username or password');

    const { isActive, deleted, password, ...data } = user;

    const accessToken = jwt.sign(data, JWT_SECRET, {
      expiresIn: '4h',
    });

    return { accessToken };
  }

  @Get('test')
  @UseGuards(AuthGuard)
  testAccessToken(): string {
    return 'okay';
  }
}
