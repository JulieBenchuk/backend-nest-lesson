import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import { pool } from './db';

@Controller()
export class HealthController {
    @Get('/health')
     getHealth(): string {
            return 'success';
    }

    @Get('/ready')
    async getReady(): Promise<string> {
        try {
            await pool.query('SELECT 1');
            return 'ready';
        } catch {
            throw new HttpException('not ready', HttpStatus.SERVICE_UNAVAILABLE) // 503
        }
    }
}