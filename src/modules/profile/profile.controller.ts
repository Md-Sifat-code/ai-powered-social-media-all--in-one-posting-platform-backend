import {
  Controller,
  Post,
  Patch,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileDto } from './dto/profile.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create user profile',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        fullName: { type: 'string' },
        bio: { type: 'string' },
        interests: { type: 'string' },
      },
    },
  })
  async create(
    @Body() body: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.profileService.createProfile(body, file, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update user profile',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        fullName: { type: 'string' },
        bio: { type: 'string' },
        interests: { type: 'string' },
      },
    },
  })
  async update(
    @Body() body: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.profileService.updateProfile(body, file, req.user.sub);
  }
}
