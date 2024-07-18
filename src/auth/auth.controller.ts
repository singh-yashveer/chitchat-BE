import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginDTO) {
    return await this.authService.login(loginAuthDto);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: number) {
    return this.authService.findOne(+id);
  }

  @Patch('user/:id')
  update(@Param('id') id: number, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: number) {
    return this.authService.remove(+id);
  }
}
