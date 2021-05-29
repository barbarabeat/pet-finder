import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';
import Users from '../models/Users';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

  // eslint-disable-next-line
  public async create(req: Request, resp: Response): Promise<Response>{
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(8),
      street: Yup.string().nullable(),
      number: Yup.number().nullable(),
      additional: Yup.string().nullable(),
      city: Yup.string().required(),
      state: Yup.string().required().max(2)
  });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, email, password, street, number, additional, city, state } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      street,
      number,
      additional,
      city,
      state
    });

    delete user.password;

    return resp.json(user);
  }

    // eslint-disable-next-line
  public async index(req: Request, resp: Response): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.find();

    user.map(user =>{
      return delete user.password;
    });

    return resp.json(user);
  }

  // eslint-disable-next-line
  public async show(req: Request, resp: Response): Promise<Response>{
    const {id} = req.params;
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne(id);

    if (!user) {
      resp
        .status(401)
        .json({ message: 'Usuário não encontrado :C' });
    }

    delete user.password;

    return resp.json(user);
  }

  // eslint-disable-next-line
public async update(req: Request, resp: Response): Promise<Response>{
  const {id} = req.params;
  const {name,email,password, street, number, additional, city, state} = req.body;
  const userRepository = getRepository(Users);


  const userFind = await userRepository.findOne(id);
  if (!userFind) {
    resp
      .status(401)
      .json({ message: 'Usuário não encontrado :C' });
  }

  const updateUser = new UpdateUserService();
  const user = await updateUser.execute({
    id,
    name,
    email,
    password,
    street,
    number,
    additional,
    city,
    state
    });

  delete user.password;

  return resp.json(user);
}

  // eslint-disable-next-line
  public async delete(req: Request, resp: Response): Promise<Response>{
    const {id} = req.params;
    const userRepository = getRepository(Users);


    const userFind = await userRepository.findOne(id);
    if (!userFind) {
      resp
        .status(401)
        .json({ message: 'Usuário não encontrado :C' });
    }


    const userDelete = await userRepository.delete(id);

    return resp.json(userDelete);
  }
}
