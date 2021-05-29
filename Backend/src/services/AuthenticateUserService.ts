import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import UsersController from '../controllers/UsersControllers';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface Request{
  email: string;
  password: string;
}

interface Response{
  user: User;
  token: string;
}

export default class AuthenticateUserService{
    // eslint-disable-next-line
    public async execute({email, password }: Request): Promise<Response>{

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        throw new AppError('Email incorreto.', 401);
      }
      const passwordMatched = await user?.comparePassword(password);
      if (!passwordMatched) {
        throw new AppError('Senha incorreta.', 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn,
      });

      return {
        user,
        token,
      };
    }
}
