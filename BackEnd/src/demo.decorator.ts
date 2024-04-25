import { createParamDecorator, ExecutionContext, Param } from '@nestjs/common';
// 客制裝飾器
export const demo = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userInfo = request.userInfo
    console.log(`demo decorator: `, userInfo, param)
    return userInfo[param] || userInfo;
  },
);