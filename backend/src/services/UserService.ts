import { hash, compare } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await hash(userData.password!, 10);
    
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}