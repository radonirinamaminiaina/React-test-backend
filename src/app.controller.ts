import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService, Employee } from './app.service';

@Controller('employee')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAllEmployee(@Query('search') search: string): Employee[] {
    return this.appService.findAllEmployee(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string): Employee[] {
    return this.appService.deleteEmployee(+id);
  }

  @Post()
  addEmployee(@Body() employee: Omit<Employee, 'id'>): Employee {
    return this.appService.addEmployee(employee);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() employee: Employee,
  ): Employee[] {
    return this.appService.updateEmployee(+id, employee);
  }
}
