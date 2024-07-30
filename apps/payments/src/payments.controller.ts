import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  getHello(): string {
    return this.paymentsService.getHello();
  }


  @MessagePattern("create_charge")
  // @UsePipes(new ValidationPipe())
  async chargePayment(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
