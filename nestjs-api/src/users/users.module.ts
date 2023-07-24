import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
