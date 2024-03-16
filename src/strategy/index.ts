import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload, IUserJWT } from 'src/common/interfaces/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly ConfigService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.get<string>('secret'),
        });
    }

    async validate(payload: IJwtPayload): Promise<IUserJWT> {
        return { ...payload.user };
    }
}
