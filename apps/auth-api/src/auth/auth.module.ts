import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  UserAccount, 
  BaseUserModule, 
  BaseAuthModule, 
  BaseLikeModule, 
  BoardPost, 
  BoardConfig, 
  ChannelConfig, 
  Like, 
  Comment 
} from '@gamecorelabs/nestjs-core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccount,
      BoardPost,
      BoardConfig,
      ChannelConfig,
      Like,
      Comment,
    ]),
    JwtModule.register({}),
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
