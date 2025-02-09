import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { AppConfig, Config } from '../../../configs/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { PostRepository } from '../../repository/services/post.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userRespository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly postRepository: PostRepository,
  ) {}

  // public async findMe(userData: IUserData) {
  //   const qb = this.userRespository.createQueryBuilder('user');
  //   qb.leftJoinAndSelect('user.refreshTokens', 'refreshTokens');
  //   qb.where('user.id = :usedId', { userId: userData.userId });
  //
  //   return await qb.getOne();
  // }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRespository.findOneBy({ id: userData.userId });
  }

  public async findOne(userId: any): Promise<UserEntity> {
    return await this.userRespository.findOneBy({ id: userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRespository.findOneBy({ id: userData.userId });
    // user.firstName = dto.firstName;
    // user.lastName = dto.lastName;
    // user.phone = dto.phone;
    this.userRespository.merge(user, dto);

    return await this.userRespository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
    await this.userRespository.delete({ id: userData.userId });
  }

  public async postForUserId(
    userData: IUserData,
    userId: UserID,
  ): Promise<void> {
    // if (userData.userId === userId) {
    //   throw new ConflictException('You cannt post yourself');
    // }

    await this.isUserExistOrThrow(userId);

    const post = await this.postRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!post) {
      throw new ConflictException('User not post');
    }

    await this.postRepository.save(
      this.postRepository.create({ user_id: userData.userId, id: post.id }),
    );
  }

  private async isUserExistOrThrow(userId: UserID): Promise<void> {
    const user = await this.userRespository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
  }
}
