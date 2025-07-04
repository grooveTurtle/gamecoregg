import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardConfig } from "../entity/board-config.entity";
import { Repository } from "typeorm";

@Injectable()
export class BoardExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    if (!value) {
      throw new NotFoundException("게시판 번호를 찾을 수 없습니다.");
    }

    return await this.boardConfigRepository
      .findOne({
        where: { id: value },
      })
      .then((board) => {
        if (!board) {
          throw new NotFoundException(`게시판 정보를 찾을 수 없습니다.`);
        }
        return board;
      });
  }
}
