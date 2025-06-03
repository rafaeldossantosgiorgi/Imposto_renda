import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { generateToken } from "../utils/jwt";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.create(req.body);
    const token = generateToken({ id: user.id });

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      token
    });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    
    const user = await this.userService.authenticate(email, password);
    const token = generateToken({ id: user.id });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      token
    });
  }

  async profile(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.findById(req.userId);
    
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType
    });
  }
}