import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { AppConfig, Config } from '../../../configs/config.type';
import { IUserData } from "../../auth/models/interface/user-data.interface";
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
// import { UserReqDto } from '../models/dto/req/user.req.dto';
// import { UserResDto } from '../models/dto/res/user.res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService<Config>) {}

  // public async create(createUserDto: UserReqDto): Promise<UserResDto> {
  //   const appConfig = this.configService.get<AppConfig>('app');
  //
  //   return {} as UserResDto;
  // }

  public async findMe(userData: IUserData) {
    return `${userData.userId}`;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  public async findOne(userId: any) {
    return `This action returns a #${userId} user`;
  }

  public async updateMe(userData: IUserData, dto: UpdateUserReqDto) {
    return `This action updates a #${userData.userId} user`;
  }

  public async removeMe(userData: IUserData) {
    return `This action removes a #${userData.userId} user`;
  }
}
