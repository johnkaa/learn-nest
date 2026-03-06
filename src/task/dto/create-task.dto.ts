import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorators';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string..' })
  @IsNotEmpty({ message: 'Title is required..' })
  @StartsWith('Task:', { message: 'Title must start with "Task:"..' })
  @Length(3, 40, { message: 'Title must be between 3 and 40 characters..' })
  title: string;

  @IsString({ message: 'Description must be a string..' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Priority must be an integer..' })
  @IsPositive({ message: 'Priority must be a positive number..' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Tags must be an array..' })
  @IsEnum(TaskTag, {
    each: true,
    message: 'Each tag must be a valid task tag..',
  })
  @IsOptional()
  tags: TaskTag[];

  // @IsString({ message: 'Password must be a string..' })
  // @MinLength(6, { message: 'Password must be at least 6 characters long..' })
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
  //   message: 'Password must contain at least one letter and one number..',
  // })
  // password: string;

  // @IsUrl(
  //   {
  //     protocols: ['https'],
  //     require_valid_protocol: true,
  //     host_blacklist: ['example.com'],
  //   },
  //   { message: 'Website URL must be a valid URL..' },
  // )
  // websiteUrl: string;

  // @IsUUID('4', { message: 'User ID must be a valid UUID..' })
  // @IsOptional()
  // userId: string;
}
