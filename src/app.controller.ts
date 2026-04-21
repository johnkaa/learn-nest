import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string, @Body('text') text: string) {
    return `Movie: ${title} + ${text}`;
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'vlad',
      email: 'vlad@gmail.com',
      userAgent,
    };
  }
}
