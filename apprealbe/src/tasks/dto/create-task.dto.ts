import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export default class CreateTaskDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Title is too long',
  })
  public title: string;

  @IsOptional()
  public description: string;
}
