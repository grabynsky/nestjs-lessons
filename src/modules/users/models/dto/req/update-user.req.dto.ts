import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UpdateUserReqDto extends PickType(UserBaseReqDto, [
  'phone',
  'firstName',
  'lastName',
  'password',
]) {}
