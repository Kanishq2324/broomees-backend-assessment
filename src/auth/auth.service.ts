import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { ApiToken } from './schemas/api_token.schema';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(ApiToken.name)
        private tokenModel: Model<ApiToken>,
      ) {}
    

    async issueTok(userId: string){
        const plainToken = randomUUID();
        const rounds = Number(process.env.TOKEN_HASH_ROUNDS); 

        const tokenHash = await bcrypt.hash(plainToken, rounds);

        const tokenExpiry = Number(process.env.TOKEN_EXPIRY_MINUTES);

        const expiresAt = new Date( Date.now() + tokenExpiry * 60 * 1000);

        await this.tokenModel.create({
            userId,
            tokenHash,
            expiresAt,
            revoked: false
        })

        return {token: plainToken, expiresAt}

    }
}
