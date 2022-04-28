import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @MinLength(10, { message: 'Email must be 6 characters.' })
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Password cannot be Empty.' })
  @MinLength(6, { message: 'Password must be 6 characters.' })
  @MaxLength(128, { message: 'Password must be less than 128.' })
  @IsDefined()
  readonly password: string;
}
