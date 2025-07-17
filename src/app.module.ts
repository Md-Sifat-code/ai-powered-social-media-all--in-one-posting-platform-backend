import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostsModule } from './modules/posts/posts.module';
import { AIService } from './modules/ai/ai.service';
import { AIController } from './modules/ai/ai.controller';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AIController],
  providers: [AIService, CloudinaryService],
})
export class AppModule {}
