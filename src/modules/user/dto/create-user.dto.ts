import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The name of a user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The email of a user',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of a user',
  })
  @IsString()
  password: string;
}
