import { Controller, Get } from '@nestjs/common';
import { pool } from './db';

@Controller('api/health')
export class HealthController {
    @Get()
    async getHealth() {
        try {
            await pool.query('SELECT 1');
            return { status: 'ok', db: 'up' };
        } catch {
            return { status: 'degraded', db: 'down' };
        }
    }
}