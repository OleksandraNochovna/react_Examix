import { Controller, Get } from '@nestjs/common';
import { UseSessionGuard } from './modules/auth/decorators/session-guard.decorator';

@Controller()
export class AppController {
  @Get('protected')
  @UseSessionGuard()
  protected() {
    return { message: 'You see protected route' };
  }
}