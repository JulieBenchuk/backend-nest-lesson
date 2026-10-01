import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';

@Controller()
export class HealthController {
    @Get('/health')
     getHealth(): string {
            return 'success';
    }

    @Get('/ready')
    getReady(): Promise<string> {
        throw new HttpException('not ready', HttpStatus.SERVICE_UNAVAILABLE) // 503
        // try {
        //     await pool.query('SELECT 1');
        //     return 'ready';
        // } catch {
        //     throw new HttpException('not ready', HttpStatus.SERVICE_UNAVAILABLE) // 503
        // }
    }
}