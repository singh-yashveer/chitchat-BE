import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register-user')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginAuthDto: LoginDTO) {
    return await this.authService.login(loginAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  async findAll() {
    return await this.authService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    return await this.authService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('user/:id')
  async update(@Param('id') id: number, @Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.update(+id, updateAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('user/:id')
  async remove(@Param('id') id: number) {
    return await this.authService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('generate-token')
  async generateToken(@Body() loginAuthDto: LoginDTO) {
    return this.authService.generateAuthtoken(loginAuthDto);
  }
}
