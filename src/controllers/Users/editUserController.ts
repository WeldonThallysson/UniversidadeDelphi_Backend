import { Request, Response } from 'express'; 
import { GetDetailsUserService } from '../../services/Users/getUserDetailsService copy'; 
import { EditUserDetailsService } from '../../services/Users/editUserDetailsService';


class editUsersController {
  async handle(req: Request, res: Response) {
    const {} = req.body;

    const editUser = new EditUserDetailsService();
    const responseEditUser = await editUser.execute({user_id})
    
     return res.json(responseEditUser);
  }
}

export { editUsersController };
