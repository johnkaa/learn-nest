import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @ApiProperty({
    description: 'Title of movie',
    example: 'Fight Club',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Url to poster of movie',
    example: 'https://image.png',
    type: String,
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Release year of movie',
    example: '1999',
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: 'Actor ids',
    example: ['bb8c5c55-5d14-4a77-b2b8-ea16b44deb1d'],
    type: Array,
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
