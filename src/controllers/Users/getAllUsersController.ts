import { Request, Response } from 'express';
import { GetAllUserService } from '../../services/Users/getAllUsersSevice';



class GetAllUsersController {
  async handle(req: Request, res: Response) {
    const name = req.query.name as string;
    const email = req.query.email as string;

    const getUsers = new GetAllUserService()
    const resultGetUsers = await getUsers.execute({email,name})
    
     return res.json(resultGetUsers);
  }
}

export { GetAllUsersController };
