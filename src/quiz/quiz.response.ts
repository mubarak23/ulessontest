import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from './entity/quiz.entity';

export class Quizesponse {
  @ApiProperty()
  quiz: Quiz;
}
