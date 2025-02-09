import { Injectable } from '@nestjs/common';

import { PostEntity } from '../../../database/entities/post.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { PostRepository } from '../../repository/services/post.repository';
import { CreatePostDto } from '../dto/req/create-post.dto';
import { ListPostQueryDto } from '../dto/req/list-post-query.dto';
import { UpdatePostDto } from '../dto/req/update-post.dto';
import { PostResDto } from '../dto/res/post.res.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(
    userData: IUserData,
    dto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postRepository.save(
      this.postRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: ListPostQueryDto,
  ): Promise<[PostEntity[], number]> {
    return await this.postRepository.findAll(userData, query);
  }

  findOne(id: number) {
    return {} as any;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return {} as any;
  }

  remove(id: number) {
    return {} as any;
  }
}
