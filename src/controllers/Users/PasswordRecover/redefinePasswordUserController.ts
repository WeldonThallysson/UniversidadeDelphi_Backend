import { Request,Response } from "express";  
import { RedefinePasswordService } from "../../../services/Users/PasswordRecover/redefinePasswordUserService";

class RedefinePasswordController {
  async handle(req: Request, res: Response) {
      const {tokenPassword,newPassword} = req.body

      const redefinePassword = new RedefinePasswordService()

      const responseRedefinePassword = await redefinePassword.execute({tokenPassword, newPassword})

      return res.status(responseRedefinePassword.data.status).json(responseRedefinePassword.data)
  
  }
}

export { RedefinePasswordController };
