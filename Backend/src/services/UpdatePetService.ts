import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Pets from '../models/Pets';

interface Request {
  id: string,
  name: string,
  breed: string,
  age: number,
  weight: number,
  city: string,
  state: string;
  isAdopted: boolean
}
export default class UpdatePetService {
    // eslint-disable-next-line
    public async execute({id, name, breed, age, weight, city, state, isAdopted}: Request): Promise<Pets> {
    const petRepository = getRepository(Pets);

    const pet = await petRepository.findOne(id);
    if (!pet) {
      throw new AppError('Pet não encontado :D :C');
    }
    pet.name = name;
    pet.breed = breed;
    pet.age = age;
    pet.weight = weight;
    pet.city = city;
    pet.state = state;
    pet.isAdopted = isAdopted;

    await petRepository.save(pet);

    return pet;
    }
}
