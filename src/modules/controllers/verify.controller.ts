import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { VerifyService } from "../services/verify.service";

@Controller("api/verify")
export class VerifyController {
  constructor(private service: VerifyService) {}
  @Get(":code")
  async verifyCrops(@Param("code") code: string) {
    await this.service.verifyCrops(code);
  }
  @Post()
  async verifyCrop(@Req() req, @Res() res) {
    this.service.verify(req, res);
  }
}
