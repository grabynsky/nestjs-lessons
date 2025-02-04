import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserReqDto } from './models/dto/req/user.req.dto';
import { UserListReqDto } from './models/dto/req/user-list.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConflictResponse({ description: 'Conflict' })
  @ApiOperation({ summary: 'Create user', description: 'Create new user' })
  @Post()
  async create(@Body() dto: UserReqDto): Promise<UserResDto> {
    return await this.usersService.create(dto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: UserListReqDto) {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
