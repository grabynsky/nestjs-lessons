import { Injectable } from '@nestjs/common';
import { UserReqDto } from './models/dto/req/user.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  public async create(createUserDto: UserReqDto): Promise<UserResDto> {
    return {} as UserResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
