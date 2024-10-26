import { Request, Response } from 'express'; 
import { GetDetailsUserService } from '../../services/Users/getUserDetailsService'; 


class GetDetailsUsersController {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    const detailsUser = new GetDetailsUserService();
    const responseDetailsUser = await detailsUser.execute({id})
    
     return res.status(responseDetailsUser.status).json(responseDetailsUser.data);
  }
}

export { GetDetailsUsersController };
