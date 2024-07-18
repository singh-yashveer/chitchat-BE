import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  'username': string;

  @IsString()
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  'email': string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  'password': string;
}
