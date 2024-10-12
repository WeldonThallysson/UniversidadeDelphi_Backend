import { Request, Response } from 'express'; 
import { DeleteUsersService } from '../../services/Users/deleteUserService';
 

class DeleteUsersController {
  async handle(req: Request, res: Response) {
     const {id} = req.params
    const deleteUser = new DeleteUsersService();
    const responseDeleteUser = await deleteUser.execute({id})
    
     return res.json(responseDeleteUser);
  }
}

export { DeleteUsersController };
