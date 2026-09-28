import { Controller, Get } from '@nestjs/common';
import { pool } from './db';

@Controller('tasks')
export class AppController {
  @Get()
  async getTasks() {
    const { rows } = await pool.query(
        'SELECT id, title, done FROM tasks ORDER BY id',
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows;
  }
}
