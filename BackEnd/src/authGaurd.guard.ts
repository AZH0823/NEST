import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
// 看守器設定
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private mimLevel: number = 0
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const reqLevel = parseInt(request.query.level) || 0
    request.userInfo = {
      levelClass : reqLevel > 50 ? 'VIP' : 'Normal',
      level: reqLevel
    }
    console.log(`autgGuard: `, request.query)
    // 對應建構值 (this.mimLevel) : private mimLevel: number = 0
    return reqLevel > this.mimLevel
  }
}