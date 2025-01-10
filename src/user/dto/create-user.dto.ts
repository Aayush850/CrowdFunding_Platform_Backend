import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  MinLength,
} from 'class-validator';
import { UserRole } from './user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(UserRole)
  role: UserRole;
}
