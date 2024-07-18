import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = this.userRepository.create(createAuthDto);
    console.log(user, 'user');
    return this.userRepository.save(user);
  }


  async login(loginAuthDto: LoginDTO) {
    const user = await this.userRepository.find({
      where: { email: loginAuthDto.email, password: loginAuthDto.password },
    });
    console.log(user, 'user');

    if (user.length === 0) {
      return {
        message: 'Invalid credentials',
        isSuccessful: false,
        user: null,
      };
    } else {
      const authToken = await this.generateAuthtoken(loginAuthDto);
      console.log(authToken, 'authToken');
      return {
        message: 'Login successful',
        isSuccessful: true,
        token: authToken,
        user: user,
      };
    }
  }


  async findAll() {
    const user = await this.userRepository.find();
    return user;
  }


  async findOne(id: number) {
    console.log(id, 'id');

    const user = await this.userRepository.findOne({ where: { id } });
    console.log(user, 'user');
    if (!user) {
      return {
        message: 'User not found',
        user: null,
      };
    }
    return {
      message: 'User found',
      user: user,
    };
  }


  async update(id: number, updateAuthDto: UpdateAuthDto) {
    await this.userRepository.update(id, updateAuthDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      return {
        message: 'User not found',
        user: null,
      };
    }
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }


  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);
    if (!deleteResult.affected) {
      return {
        message: 'User not found',
        user: null,
      };
    }
    return {
      message: 'User removed successfully',
      user: id,
    };
  }


  async generateAuthtoken(user: LoginDTO) {
    const token = jwt.sign(user, process.env.JWT_GENERATOR_TOKEN, {
      expiresIn: 86400,
    });

    return {'message': 'Success',
    'data': {'token': token,
            'expiresIn': 86400,
          'type': 'Bearer'}};
  }
}
