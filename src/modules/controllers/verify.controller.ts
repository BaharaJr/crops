import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { VerifyService } from "../services/verify.service";

@Controller("api/verify")
export class VerifyController {
  constructor(private service: VerifyService) {}
  @Post()
  async verifyCrop(@Req() req: any, @Res() res: any) {
    this.service.verify(req, res);
  }
}
