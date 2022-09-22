import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  status() {
    return { status: 200, message: "OK" };
  }
}
