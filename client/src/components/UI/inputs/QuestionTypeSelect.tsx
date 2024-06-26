import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import QuestionType from '../../../types/api/enums/Type';
import underscoreToUpperToSentence from '../../../utils/underscoreToUpperToSentence';

interface Props extends TextFieldProps<'standard'> {}

const QuestionTypeSelect: React.FC<Props> = ({ ...rest }) => {
  return (
    <TextField
      defaultValue={QuestionType.SINGLE_CHOICE}
      {...rest}
      size="small"
      select
      sx={{ width: '158px' }}
    >
      {(Object.values(QuestionType) as Array<keyof typeof QuestionType>).map((type) => (
        <MenuItem
          disabled={type === QuestionType.SHORT_ANSWER || type === QuestionType.TRUE_FALSE}
          key={type}
          value={type}
        >
          {underscoreToUpperToSentence(type)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default QuestionTypeSelect;
