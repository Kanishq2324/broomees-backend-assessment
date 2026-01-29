import { Controller, Get } from '@nestjs/common';
import { ReputationService } from './reputation.service';

@Controller('api/metrics')
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Get('reputation')
  getReputationMetrics() {
    return this.reputationService.getSystemReputationStats();
  }
}