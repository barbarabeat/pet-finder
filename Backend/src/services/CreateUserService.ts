import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Users from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
  street: string;
  number: number;
  additional: string;
  city: string;
  state: string;
}

export default class CreateUserService {
    // eslint-disable-next-line
    public async execute({ name, email, password, street, number, additional, city, state }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const userExists = await userRepository.findOne({
      where:{
        email
      },
    });

    if (userExists){
      throw new AppError('Usuario ja existente');
    }

//else
    const newUser = {
      name,
      email,
      password,
      street,
      number,
      additional,
      city,
      state
    };

    const user = await userRepository.create(newUser);

    await userRepository.save(user);

    return user;

    }
}
