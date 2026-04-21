import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { timestamp } from 'rxjs';
import { MovieResponse } from './dto/movie-response.dto';

@ApiTags('Movie (with documentation)')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get list of movies',
    description: 'Returns list of movies',
  })
  @ApiOkResponse({
    description: 'Movies was found',
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get a movie by ID',
    description: 'Returns a movie information',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of movie' })
  @ApiQuery({
    name: 'year',
    type: 'number',
    description: 'Filter by year',
    required: false,
  })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Token of authorization' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie was found',
    type: MovieResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found',
    example: {
      status: 404,
      message: 'Movie not found example',
      timestamp: new Date().toLocaleString(),
      path: '/movie/123',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: 'Create a movie' })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
