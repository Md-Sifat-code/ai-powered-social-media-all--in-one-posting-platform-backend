import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async createProfile(
    data: ProfileDto,
    file: Express.Multer.File,
    userId: number,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      const upload = await this.cloudinary.uploadImage(file);
      imageUrl = upload.secure_url;
    }

    return this.prisma.profile.create({
      data: {
        fullName: data.fullName,
        bio: data.bio,
        interests: data.interests?.split(',').map((i) => i.trim()) || [],
        profilePic: imageUrl,
        userId,
      },
    });
  }

  async updateProfile(
    data: ProfileDto,
    file: Express.Multer.File,
    userId: number,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      const upload = await this.cloudinary.uploadImage(file);
      imageUrl = upload.secure_url;
    }

    return this.prisma.profile.update({
      where: { userId },
      data: {
        fullName: data.fullName,
        bio: data.bio,
        interests: data.interests?.split(',').map((i) => i.trim()) || [],
        ...(imageUrl && { profilePic: imageUrl }),
      },
    });
  }
}
