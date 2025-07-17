import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: number) {
    return this.prisma.facebookPost.create({
      data: {
        ...data,
        userId,
      },
    });
  }
}
