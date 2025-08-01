import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  CreateChannelConfigDto,
  CreateBoardConfigDto,
  AdminRoleUserGuard,
  GuestOrUserTokenGuard,
  BaseChannelService,
  BaseBoardService,
  QueryRunnerTransactionInterceptor,
  CurrentQueryRunner,
  CsrfTokenProtectionGuard,
} from '@gamecorelabs/nestjs-core';
import { QueryRunner } from 'typeorm';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseBoardService: BaseBoardService,
    private readonly baseChannelService: BaseChannelService,
  ) {}

  @Get('/channel')
  @UseGuards(GuestOrUserTokenGuard, AdminRoleUserGuard)
  getChannelConfig() {
    return this.baseChannelService.getChannelConfig();
  }

  @Get('/channel/:channel/status')
  async getChannelStatus(@Param('channel') channel: string) {
    return await this.baseChannelService.getChannelStatusByChannelName(channel);
  }

  @Post('/channel')
  @UseGuards(CsrfTokenProtectionGuard, AdminRoleUserGuard)
  postChannelConfig(@Body() body: CreateChannelConfigDto) {
    return this.baseChannelService.saveChannelConfig(body);
  }

  // 게시판 설정 저장
  @Post('/channel/:id/board')
  @UseGuards(CsrfTokenProtectionGuard, AdminRoleUserGuard)
  @UseInterceptors(QueryRunnerTransactionInterceptor)
  postBoardConfig(
    @Param('id') id: number,
    @CurrentQueryRunner() qr: QueryRunner,
    @Body() body: CreateBoardConfigDto,
  ) {
    return this.baseBoardService.saveBoardConfig(id, body, qr);
  }

  // 설정된 게시판 모두 불러오기
  @Get('/board')
  getBoardConfig() {
    return this.baseBoardService.getBoardConfig();
  }
}
