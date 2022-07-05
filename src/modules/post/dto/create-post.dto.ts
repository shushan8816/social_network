import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  description: string;
}
