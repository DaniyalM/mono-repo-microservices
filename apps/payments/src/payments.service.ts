import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  getHello(): string {
    return 'Hello World!';
  }


  async createCharge(createCharge: CreateChargeDto) {

    return createCharge;

  }
}
