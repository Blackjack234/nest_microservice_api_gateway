import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


export class JWtAuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization']

        if(!authHeader || !authHeader.startWith('Bearer')){
          throw new UnauthorizedException('Missing or malformed token.')
        }

        const token = authHeader.split(' ')[1]

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload
            return true
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired token.")
        }
    }
}