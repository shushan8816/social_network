import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
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
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of a user',
  })
  @IsString()
  password: string;
}
