import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { ApiToken } from './schemas/api_token.schema';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(ApiToken.name)private readonly tokenModel: Model<ApiToken>,) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];

        // if no auth header present
        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        // split() splits the authHeader into array of substrings 
        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid Authorization format');
        }

        //  Find token in DB 
        const tokenRecords = await this.tokenModel.find({
            revoked: false,
            expiresAt: { $gt: new Date() },
        });

        let matchedToken: ApiToken | null = null;

        for (const record of tokenRecords) {
            const isMatch = await bcrypt.compare(token, record.tokenHash);

            if (isMatch) {
                matchedToken = record;
                break;
            }
        }

        if (!matchedToken) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        // Attach userId to request 
        request.userId = matchedToken.userId.toString();

        
        return true;
    }
}