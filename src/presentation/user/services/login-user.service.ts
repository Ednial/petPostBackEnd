import { envs } from '../../../config';
import { encryptAdapter } from '../../../config/bcrypt.adapter';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User } from '../../../data';
import { CustomError } from '../../../domain';
import { LoginUserDto } from '../../../domain/dtos/users/login-user.dto';
import { RegisterUserService } from './register-user.service';

export class LoginUserService {
  async execute(data: LoginUserDto) {
    const user = await this.ensureUserExist(data);

    this.ensurePasswordIsCorrect(data, user);

    const token = await this.generateToken(
      { id: user.id },
      envs.JWET_EXPIRE_IN
    );

    return {
      token,
      user: {
        id: user.id,
        fullname: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  private ensurePasswordIsCorrect(credentials: LoginUserDto, user: User) {
    const isMatch = encryptAdapter.compare(credentials.password, user.password);

    if (!isMatch) {
      throw CustomError.unAuthorized('Invalid Credentials');
    }
  }

  private async ensureUserExist(credentials: LoginUserDto) {
    const user = await User.findOne({
      where: {
        email: credentials.email,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.unAuthorized('Invalid Credentials');
    }

    return user;
  }

  private async generateToken(payload: any, duration: string) {
    const token = await JwtAdapter.generateToken(payload, duration);
    if (!token) throw CustomError.internalServer('Error while creating jwt');
    return token;
  }
}
