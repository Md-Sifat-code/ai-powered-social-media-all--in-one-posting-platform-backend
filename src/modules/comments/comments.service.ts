import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(data: any) {
    return this.prisma.comment.create({ data });
  }

  async addReply(data: any) {
    return this.prisma.comment.create({ data });
  }

  async getComments(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId, parentId: null },
      include: {
        replies: {
          include: {
            replies: true,
          },
        },
      },
    });
  }
}
