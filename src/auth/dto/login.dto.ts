import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginDTO {
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
