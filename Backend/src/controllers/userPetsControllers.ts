import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import Pets from '../models/Pets';
import Users from '../models/Users';
import CreatePetService from '../services/CreatePetService';
import UpdatePetService from '../services/UpdatePetService';

export default class userPets{

  public async userPetsList(req: Request, resp: Response): Promise<Response> {

    const {user_id} = req.params;

    const petRepository = getRepository(Pets);

    const pet = await petRepository.find(
      {
        where: {
          user_id: user_id
        }
    });
    if (!pet) {
      resp
        .status(401)
        .json({ message: 'Usuário sem pets :C' });
    }
    else  resp.status(200);

    return resp.json(pet);
  }
}
