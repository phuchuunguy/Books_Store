import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      role: role || UserRole.USER,
    });
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({where: {username}});
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
