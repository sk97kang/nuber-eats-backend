import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exist = await this.users.findOne({ where: { email } });
      if (exist) {
        return {
          ok: false,
          error: 'email is already',
        };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Cound't create account",
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'user is not found',
        };
      }
      const checkedPassword = await user.checkPassword(password);
      if (!checkedPassword) {
        return {
          ok: false,
          error: 'wrong password',
        };
      }
      return {
        ok: true,
        token: 'token',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'dont login',
      };
    }
  }
}
