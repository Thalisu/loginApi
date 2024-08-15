import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/user.services";

@injectable()
export class UserControllers {
  constructor(@inject("UserServices") private userServices: UserServices) {}

  async login(req: Request, res: Response) {
    const response = await this.userServices.login(req.body);
    return res.status(200).json(response);
  }

  async register(req: Request, res: Response) {
    const response = await this.userServices.register(req.body);

    return res.status(201).json(response);
  }

  async delete(req: Request, res: Response) {
    await this.userServices.deleteOne(req.params.id);

    return res.status(204).json({});
  }

  async updateUser(req: Request, res: Response) {
    const updatedUser = await this.userServices.updateUser(
      req.params.id,
      req.body
    );

    return res.status(200).json(updatedUser);
  }

  async getUser(req: Request, res: Response) {
    const user = await this.userServices.getUser();
    return res.status(200).json(user);
  }
}
