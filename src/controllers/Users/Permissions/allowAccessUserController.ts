import { Response,Request } from "express";
import { AllowAccessUserService } from "../../../services/Users/Permissions/allowAccessUserServices";

 

class AllowAccessUserController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id
    const {
        email_user,
        masterAccessParam,
    } = req.body

    const allowAccess = new AllowAccessUserService()
    const responseAllowAccess = await allowAccess.execute({email_user,id_user_logged,masterAccessParam})

    return res.status(responseAllowAccess.data.status).json(responseAllowAccess.data)
    
  }
}

export { AllowAccessUserController };
