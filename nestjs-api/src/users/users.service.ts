import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user-body';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user-body';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateUserDto) {
    const data = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    return {
      ...createdUser,
      password: undefined,
    };
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10); // Converter o id para um número inteiro
    return this.prisma.user.update({
      where: { id: userId }, // Usar o userId convertido na consulta do Prisma
      data: updateUserDto,
    });
  }
  Delete(id: string) {
    const userId = parseInt(id, 10);
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
  /*
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
  
  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
  */
}
