import { PickType } from "@nestjs/mapped-types";
import { BoardConfig } from "../entity/board-config.entity";

export class CreateBoardConfigDto extends PickType(BoardConfig, [
  "title",
  "type",
  "description",
  "status",
]) {}
