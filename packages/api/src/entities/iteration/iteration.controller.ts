import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IterationService } from './iteration.service';
import { Iteration } from './iteration.model';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { respondWith } from '../../responses';
import { AuthGuard } from '../../auth/auth.guard';
import { IterationParam } from './iteration.interface';

@UseGuards(AuthGuard)
@Controller('iterations')
export class IterationController {
  constructor(private iterationService: IterationService) {}

  @Get('/')
  async findAll(): Promise<Iteration[]> {
    try {
      return await this.iterationService.findAll();
    } catch (e) {
      console.error(e);

      return respondWith(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  async createIteration(
    @Body() createIterationDto: CreateIterationDto,
  ): Promise<Iteration> {
    try {
      return await this.iterationService.create(createIterationDto);
    } catch (e) {
      console.error(e);

      return respondWith(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:id')
  async updateIteration(
    @Param() { id }: IterationParam,
    @Body() createIterationDto: CreateIterationDto,
  ): Promise<Iteration> {
    try {
      return await this.iterationService.update(id, createIterationDto);
    } catch (e) {
      console.error(e);

      return respondWith(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  async deleteIteration(@Param() { id }: IterationParam): Promise<void> {
    try {
      return await this.iterationService.delete(id);
    } catch (e) {
      console.error(e);

      return respondWith(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
