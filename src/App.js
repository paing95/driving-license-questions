import { useState, useEffect } from 'react';
// component
import Question from './components/question';
// data
import { data } from "./data/questions";
// MUI
import { Alert, AppBar, Box, Button, Container, Typography } from '@mui/material';
// css
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const [questions, setQuestions] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const shuffleArray = (arr) => {
      const array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  const handleChange = (question, value) => {

    setQuestions(prevQuestions => 
      prevQuestions.map(q => q.question === question ? {...q, answer: value} : q)
    );
    setAnsweredCount(answeredCount + 1);
  };

  const handleSubmitClicked = () => {
    setShowAlert(false);
    if (questions.filter(x => x.answer !== "").length !== questions.length) {
      setShowAlert(true);
    } else {
      setShowAnswer(true);
    }
  }

  const handleResetClicked = () => {
    // console.log('=== Data ===', data);
    setQuestions(JSON.parse(JSON.stringify(data)));
    setResetCount(prev => prev + 1);
    setShowAnswer(false);
    setShowAlert(false);
  };

  // useEffects
  useEffect(() => {
    setQuestions(JSON.parse(JSON.stringify(
      shuffleArray(data)
    )));
  }, []);

  return (
    <Container disableGutters maxWidth={'xl'}>
      <AppBar 
        position="static" 
        sx={{ 
          justifyContent: "space-between", 
          flexFlow: "row", 
          padding: "0.5em" 
        }}
      >
        <Box
          component="div" 
          sx={{ 
            marginRight: "1em", 
            gap: "1em",
            flexGrow: "1",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button 
            color="inherit" 
            onClick={() => window.location.href = 'https://sgi.sk.ca/handbook/-/knowledge_base/drivers/introduction'}>
              Driver's Handbook
          </Button>
          <Typography 
            variant="subtitle1" 
            >
            Answered: {questions.filter(x => x.answer !== "").length} / {questions.length}
          </Typography>
        </Box>
        <Button 
          color="inherit" 
          onClick={handleResetClicked}>
            Reset
        </Button>
        <Button 
          color="inherit" 
          onClick={handleSubmitClicked}>
            Submit
        </Button>
      </AppBar>
      <Box 
        sx={{ 
          display: "flex", 
          flexFlow: "column", 
          gap: "1em", 
          overflowY: "auto", 
          height: "calc(100vh - 100px)", 
          paddingLeft: "1.5em", 
          paddingRight: "1.5em", 
          paddingTop: '1em', 
          paddingBottom: "1em" 
        }
      }>
        {showAlert && <Alert severity="error">Please answer all the questions.</Alert>}
        {questions.map((question, key) => <Question
          id={key + 1}
          question={question.question}
          options={question.options}
          answer={question.answer}
          correct_answer={question.correct_answer}
          handleChange={handleChange}
          key={`${key + 1}-${resetCount}`}
          showAnswer={showAnswer}
        />)}
      </Box>
    </Container>
  );
}

export default App;
