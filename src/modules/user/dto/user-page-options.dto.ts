import { PageOptionsDto } from '../../../decorators/page-options.dto';
import { IsBoolean } from 'class-validator';

export class UserPageOptionsDto extends PageOptionsDto {
  @IsBoolean()
  takeAll: boolean;
}
