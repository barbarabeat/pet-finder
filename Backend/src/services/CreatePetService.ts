import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Pets from '../models/Pets';

interface Request {
  name: string;
  breed: string;
  age: number;
  weight: number,
  city: string;
  state: string;
  user_id: string;
  isAdopted: boolean;
}

export default class CreatePetService {
    // eslint-disable-next-line
    public async execute({name, breed, age, weight, city, state, user_id, isAdopted}: Request): Promise<Pets> {
    const petRepository = getRepository(Pets);

    const newPet = {
      name,
      breed,
      age,
      weight,
      city,
      state,
      user_id,
      isAdopted
    };

    const pet = await petRepository.create(newPet);

    await petRepository.save(pet);

    return pet;

    }
}
