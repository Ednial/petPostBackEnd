import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { Role, User } from '../../../data';

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    let token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) return res.status(401).json({ message: 'Unauthorized' });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: true,
        },
      });
      if (!user) return res.status(401).json({ message: 'Unauthorized' });

      (req as any).sessionUser = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error no user found' });
    }
  }

  static restrictTo = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes((req as any).sessionUser.role)) {
        return res.status(403).json({
          message: 'You do not have permission to perform this action',
        });
      }
      next();
    };
  };
}
