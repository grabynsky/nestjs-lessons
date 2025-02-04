import { IsOptional } from 'class-validator';

export class UserListReqDto {
  @IsOptional()
  readonly search?: string;

  @IsOptional()
  readonly page?: string;

  @IsOptional()
  readonly limit?: string;

  @IsOptional()
  readonly sort?: string;
}