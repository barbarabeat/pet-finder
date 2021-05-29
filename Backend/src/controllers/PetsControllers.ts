import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import Pets from '../models/Pets';
import Users from '../models/Users';
import CreatePetService from '../services/CreatePetService';
import UpdatePetService from '../services/UpdatePetService';
export default class PetsController {

  // eslint-disable-next-line
  public async create(req: Request, resp: Response): Promise<Response>{
    const schema = Yup.object({
      name: Yup.string().required(),
      breed: Yup.string().required(),
      age: Yup.number().nullable(),
      weight: Yup.number(),
      city: Yup.string().required(),
      state: Yup.string().required().max(2),
      isAdopted: Yup.boolean(),
  });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, breed, age, weight, city, state, isAdopted} = req.body;

    const createPet = new CreatePetService();

    const user_id = req.user.id;

    const pet = await createPet.execute({
      name,
      breed,
      age,
      weight,
      city,
      state,
      user_id,
      isAdopted,
    });

    return resp.json(pet);
  }

    // eslint-disable-next-line
  public async index(req: Request, resp: Response): Promise<Response> {
    const petRepository = getRepository(Pets);

    const pet = await petRepository.find();


    return resp.json(pet);
  }

  // eslint-disable-next-line
  public async show(req: Request, resp: Response): Promise<Response>{
    const {id} = req.params;
    const petRepository = getRepository(Pets);

    const petFind = await petRepository.findOne(id);
    if (!petFind) {
      resp
        .status(401)
        .json({ message: 'Pet não encontrado :C' });
    }

    return resp.json(petFind);
  }

// eslint-disable-next-line
public async update(req: Request, resp: Response): Promise<Response>{
  const {id} = req.params;
  const {name, breed, age, weight, city, state, isAdopted} = req.body;
  const petRepository = getRepository(Pets);


  const petFind = await petRepository.findOne(id);
  if (!petFind) {
    resp
      .status(401)
      .json({ message: 'Pet não encontrado :C' });
  }

  const updatePet = new UpdatePetService();
  const pet = await updatePet.execute({
    id,
    name,
    breed,
    age,
    weight,
    city,
    state,
    isAdopted
  });

  return resp.json(pet);
}

  // eslint-disable-next-line
  public async delete(req: Request, resp: Response): Promise<Response>{
    const {id} = req.params;
    const petRepository = getRepository(Pets);


    const petFind = await petRepository.findOne(id);
    if (!petFind) {
      resp
        .status(401)
        .json({ message: 'Pet não encontrado :C' });
    }


    const petDelete = await petRepository.delete(id);

    return resp.json(petDelete);
  }
}
