import { IsEmail, IsEnum, IsInt, IsNotIn, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { RoleEnum } from '../../enums/role.enum';

export class UserBaseReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @IsOptional()
  @Length(3,20)
  readonly firstName?: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(3,30)
  @IsOptional()
  readonly lastName?: string;

  @IsInt()
  @IsOptional()
  // @Transform(TransformHelper.trim)
  readonly age?: number;

  @ApiProperty({example: 'asd@asd.com'})
  @IsEmail()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  readonly email: string;

  @ApiProperty({ example: '12qw4qeASD' })
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '123456', 'qwerty'])
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  readonly password: string;

  @IsString()
  @Transform(TransformHelper.trim)
  readonly phone?: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  readonly role?: RoleEnum
}