import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  @MinLength(10)
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
