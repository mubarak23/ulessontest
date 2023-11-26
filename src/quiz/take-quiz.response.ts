import { ApiProperty } from '@nestjs/swagger';
import { UserQuiz } from './entity/user-quiz.entity';

export class TakeQuizesponse {
  @ApiProperty()
  takequiz: UserQuiz;
}
