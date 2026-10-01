import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';

@Controller()
export class HealthController {
    @Get('/health')
     getHealth(): string {
            return 'success';
    }

    @Get('/ready')
    async getReady(): Promise<string> {
        try {
            /*await pool.query('SELECT 1');
            return 'ready';*/
            throw new HttpException('not ready', HttpStatus.SERVICE_UNAVAILABLE) // 503
        } catch {
            throw new HttpException('not ready', HttpStatus.SERVICE_UNAVAILABLE) // 503
        }
    }
}