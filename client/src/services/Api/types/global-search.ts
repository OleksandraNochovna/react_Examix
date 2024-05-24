import { Exam } from '../../../types/api/entities/exam';
import { Question } from '../../../types/api/entities/question';
import { Test } from '../../../types/api/entities/test';
import { WithMessage } from './utils';

export type GlobalSearchResponse = WithMessage<{
  results: GlobalSearchResult[];
}>;

export type GlobalSearchResult =
  | GlobalSearchResultQuestion
  | GlobalSearchResultTest
  | GlobalSearchResultExam;

interface GlobalSearchResultExam {
  type: 'exam';
  item: Exam;
}

interface GlobalSearchResultTest {
  type: 'test';
  item: Test;
}

interface GlobalSearchResultQuestion {
  type: 'question';
  item: Question;
}
