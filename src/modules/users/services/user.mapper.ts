// import { UserEntity } from '../../../database/entities/user.entity';
// import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
// import { IUserData } from '../../auth/models/interfaces/user-data.interface';
// import { UserResDto } from '../models/dto/res/user.res.dto';

import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interface/jwt-payload.interface';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
