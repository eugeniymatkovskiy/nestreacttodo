import { ApiProperty } from '@nestjs/swagger';
import UserDTO from '../../users/dto/user.dto';

export default class TaskDTO {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: UserDTO,
  })
  owner: UserDTO;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  description: string | null;

  @ApiProperty({
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    type: Boolean,
  })
  isDone: boolean;
}
