import { getRepository } from 'typeorm';
import { number } from 'yup/lib/locale';
import AppError from '../errors/AppError';
import Users from '../models/Users';

interface Request {
  id: string,
  name: string,
  email: string,
  password: string,
  street:string,
  number: number,
  additional: string,
  city: string,
  state: string
}
export default class UpdateUserService {
    // eslint-disable-next-line
    public async execute({id, name, email, password, street, number, additional, city, state}: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('Usuario não encontado :D :C');
    }
    user.name = name;
    user.email = email;
    user.password = password;
    user.street = street;
    user.number = number;
    user.additional = additional;
    user.city = city;
    user.state = state;

    await userRepository.update(id,{name,email,password, street, number, additional, city, state});

    await userRepository.save(user);

    return user;
    }
}
