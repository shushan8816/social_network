import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
