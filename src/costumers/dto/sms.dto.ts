import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SmsDTO {
  @ApiProperty({
    required: true,
    example: 'ac26b9e3-1872-4f52-95fa-11d6e5ee8513',
  })
  @IsUUID(4, { each: true })
  ids: string[];

  @IsString()
  @ApiProperty({ required: true, example: 'hello, you have a discount!' })
  body: string;
}
