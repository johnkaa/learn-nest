import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MovieResponse {
  @ApiProperty({
    description: 'ID of movie',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
  @ApiProperty({
    description: 'Title of movie',
    example: 'Fight Club',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
