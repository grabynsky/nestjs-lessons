import { PickType } from '@nestjs/swagger';
import { UserBaseReqDto } from './user-base.req.dto';

export class UserReqDto extends PickType(UserBaseReqDto, [
  'firstName',
  'lastName',
  'email',
  'phone',
  'age',
  'password',
  'role',
]){}
