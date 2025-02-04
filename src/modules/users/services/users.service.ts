import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, Config } from '../../../configs/config.type';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserReqDto } from '../models/dto/req/user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService<Config>) {}

  public async create(createUserDto: UserReqDto): Promise<UserResDto> {
    const appConfig = this.configService.get<AppConfig>('app');
    console.log(appConfig);
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
