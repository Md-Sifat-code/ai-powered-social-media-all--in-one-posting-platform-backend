import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'I love social media marketing.', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: 'ai, social media, automation',
    description: 'Comma separated list of interests',
    required: false,
  })
  @IsOptional()
  @IsString()
  interests?: string;
}
