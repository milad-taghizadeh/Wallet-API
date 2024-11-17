import { userStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEnum(userStatus)
  status: userStatus;
  
  @IsString()
  discountId: number;
}
