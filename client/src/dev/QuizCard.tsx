import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Alert,
  AlertTitle,
} from '@mui/material';
import { memo, useState, useEffect } from 'react';
import { SingleButtonGroup, MultipleButtonGroup } from '../components/UI/AnswersButtonGroups';
import { Question, QuestionType, StudentAnswer } from './questions';

interface CardProps {
  question: Question;
  sendAnswer: (answer: StudentAnswer[]) => void;
}

const QuizCard: React.FC<CardProps> = memo(({ question: { title, answers, maxScore, type } }) => {
  const [selectedValue, setSelectedValue] = useState<StudentAnswer[]>([]);
  const [isShowAnswers, setIsShowAnswers] = useState(true);

  useEffect(() => {
    setIsShowAnswers(true);
  }, [answers]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(selectedValue);
  }, [selectedValue]);

  return isShowAnswers ? (
    <Card
      elevation={3}
      sx={{ minWidth: '350px', maxWidth: '500px', padding: '15px', borderRadius: '10px' }}
    >
      <CardHeader title={title} />
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography variant="body1" color="text.secondary">
          Max score: {maxScore}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '12px' }}>
        {type === QuestionType.SINGLE_CHOICE ? (
          <SingleButtonGroup
            answers={answers}
            setIsShowAnswers={setIsShowAnswers}
            setValue={setSelectedValue}
          />
        ) : (
          <MultipleButtonGroup
            answers={answers}
            setIsShowAnswers={setIsShowAnswers}
            setValue={setSelectedValue}
          />
        )}
      </CardActions>
    </Card>
  ) : (
    <Alert sx={{ width: '400px' }} severity="info">
      <AlertTitle>Wait for the timer to end</AlertTitle>
    </Alert>
  );
});

export default QuizCard;
