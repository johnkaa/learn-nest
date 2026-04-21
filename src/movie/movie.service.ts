import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });

    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Film not found');

    return movie;
  }
  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, url, actorIds } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: actorIds,
        },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or more actors not found');

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: url
          ? {
              create: {
                url,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });

    return movie;
  }
  async update(id: string, dto: MovieDto): Promise<boolean> {
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: dto.actorIds,
        },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or more actors not found');

    await this.prismaService.movie.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.url
          ? {
              create: {
                url: dto.url,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });
    return true;
  }
  async delete(id: string): Promise<string> {
    await this.prismaService.movie.delete({
      where: {
        id,
      },
    });
    return id;
  }
}
