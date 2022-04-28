import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'The firstName of a user',
  })
  firstName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The lastName of a user',
  })
  lastName?: string;

  @ApiProperty({
    type: String,
    description: 'The userName of a user',
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'The email of a user',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of a user',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  isActive?: boolean;
}
