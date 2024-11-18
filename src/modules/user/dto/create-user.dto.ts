import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  phone: string;
}
