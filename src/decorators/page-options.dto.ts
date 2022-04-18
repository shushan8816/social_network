import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class PageOptionsDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsPositive()
  readonly page: number = 1;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 5 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsPositive()
  readonly take: number = 5;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly queue?: string;
}
