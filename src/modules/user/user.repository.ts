import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Repository } from "src/common/interfaces/repository";
import { PrismaService } from "src/database/database.service";
import { v4 as uuid } from "uuid";



@Injectable()
export class UserRepository implements Repository<User> {

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...data,
        id: uuid()
      }
    })
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
  }


  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id
      },
    })
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        phone
      },
    })
  }


  async findMany(filters: Partial<User>): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: {
        ...filters
      },
    })
  }
}

