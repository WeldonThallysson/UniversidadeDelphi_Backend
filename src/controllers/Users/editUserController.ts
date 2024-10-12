import { Request, Response } from 'express'; 
import { GetDetailsUserService } from '../../services/Users/getUserDetailsService'; 
import { EditUsersService } from '../../services/Users/editUserService';


class EditUsersController {
  async handle(req: Request, res: Response) {
    const { 
      id,
      name,
      email,
      status,
    } = req.body;

    const editUser = new EditUsersService();
    const responseEditUser = await editUser.execute({ 
      id,
      name,
      email,
      status})
    
     return res.status(responseEditUser.status).json(responseEditUser);
  }
}

export { EditUsersController };
