import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IssueTokenDto } from './issueTokenDto/token.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('token')
    async issueToken(@Body() dto: IssueTokenDto){
        return await this.authService.issueTok(dto.userId);
    }
}
