import { Request, Response } from 'express'; 
import { GetDetailsUserService } from '../../services/Users/getUserDetailsService'; 


class GetDetailsUsersController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailsUser = new GetDetailsUserService();
    const responseDetailsUser = await detailsUser.execute({user_id})
    
     return res.json(responseDetailsUser);
  }
}

export { GetDetailsUsersController };
