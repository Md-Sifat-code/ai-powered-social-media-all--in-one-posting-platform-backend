import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashed,
      },
    });
    return { message: 'User created', userId: user.id };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username, email: user.email };

    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
