import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from "../auth/decorators/skip-auth.decorator";
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interface/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserReqDto } from './models/dto/req/user.req.dto';
import { UserListReqDto } from './models/dto/req/user-list.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiConflictResponse({ description: 'Conflict' })
  // @ApiOperation({ summary: 'Create user', description: 'Create new user' })
  // @Post()
  // async create(@Body() dto: UserReqDto): Promise<UserResDto> {
  //   return await this.usersService.create(dto);
  // }
  //
  // @ApiBearerAuth()
  // @Get()
  // public async findAll(@Query() query: UserListReqDto) {
  //   return this.usersService.findAll();
  // }

  @ApiBearerAuth()
  @ApiTags('ME')
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.findMe(userData);

    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch('me')
  public async update(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateMe(userData, updateUserDto);

    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    const result = await this.usersService.findOne(userId);
    // return UserMapper.toResDto(result)
    return result;
  }
}
