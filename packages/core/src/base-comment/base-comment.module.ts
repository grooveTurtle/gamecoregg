import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCommentService } from "./base-comment.service";
import { Comment } from "./entity/comment.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { Like } from "@_core/base-like/entity/like.entity";
import { CommentInPostGuard } from "./guard/comment-in-post.guard";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like])],
  providers: [BaseCommentService, CommentInPostGuard],
  exports: [BaseCommentService, CommentInPostGuard],
})
export class BaseCommentModule {}
