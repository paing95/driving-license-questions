import { useState, useEffect, useRef } from 'react';
// component
import Question from './components/Question';
import ScrollToTop from './components/ScrollToTop';
import Pagination from './components/Pagination';
import Logo from "../src/asset/favicon.ico";
// data
import data from './data/questions.json';
// MUI
import { 
  Alert, 
  AppBar, 
  Box, 
  Button, 
  Container,
  IconButton,
  Tooltip,
  Typography 
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PublishIcon from '@mui/icons-material/Publish';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { red } from '@mui/material/colors';
// css
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const HandbookRef = useRef();
  const QuestionsRef = useRef();
  const ScrollToRef = useRef();
  const [questions, setQuestions] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [size, setSize] = useState(10);

  // styles
  const mobileBoxStyles = {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const logoStyles = { 
    maxHeight: "35px", 
    marginBottom: "0.3em",
    cursor: "pointer"
  };

  const logoTextStyles = {
    mr: 2,
    ml: 1,
    mb: "0.3em",
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.1rem',
    color: 'inherit',
    textDecoration: 'none'
  };

  const AppBarStyles = { 
    justifyContent: "space-between", 
    flexFlow: "row", 
    padding: "0.5em" 
  };

  const AppBarLeftStyles = { 
    marginRight: "0.5em", 
    gap: "0.5em",
    flexGrow: "1",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const ContentStyles = { 
    display: "flex", 
    flexFlow: "column", 
    gap: "0.5em", 
    overflowY: "auto", 
    height: "calc(100vh - 100px)",
    paddingLeft: "1.5em", 
    paddingRight: "1.5em", 
    paddingTop: '0.2em', 
    paddingBottom: "1em" 
  };

  const ErrorTextStyles = { 
    color: "#EE2B2A", 
    fontWeight: "600", 
    textShadow: "0px 0px 4px #ddd" 
  }

  // events
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
    setShowAnswer(true);
  }

  const handleResetClicked = () => {
    let copiedData = shuffleArray(JSON.parse(JSON.stringify(data)));
    let count = 1;
    copiedData.forEach(copied => {
      copied.id = count;
      copied.options = shuffleArray(copied.options);
      count ++;
    });
    setQuestions(copiedData);
    setCurrentPage(1);
    setCurrentQuestions(copiedData.slice(0, 1 * size))
    setResetCount(prev => prev + 1);
    setShowAnswer(false);
    setShowAlert(false);
  };

  // useEffects
  useEffect(() => {
    let copiedData = shuffleArray(JSON.parse(JSON.stringify(data)));
    let count = 1;
    copiedData.forEach(copied => {
      copied.id = count;
      copied.options = shuffleArray(copied.options);
      count ++;
    });
    setQuestions(copiedData);
    setCurrentQuestions(copiedData.slice((currentPage-1) * size, currentPage * size));
  }, []);

  return (
    <Container disableGutters maxWidth={'xl'}>
      <AppBar 
        position="static" 
        sx={AppBarStyles}
      >
        <Box
          component="div" 
          sx={AppBarLeftStyles}
        >
          <Box
            sx={mobileBoxStyles}
          >
            <img 
              src={Logo} 
              style={logoStyles}
              onClick={() => window.location.href = "/"}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={logoTextStyles}
            >
              DrivinLic
            </Typography>
            <Button 
              className='not-mobile'
              color="inherit" 
              onClick={() => HandbookRef.current.click()}>
                Handbook
                <a 
                  ref={HandbookRef}
                  href='https://sgi.sk.ca/handbook/-/knowledge_base/drivers/introduction' 
                  target='_blank'></a>
            </Button>
            <Tooltip
              className='mobile-only'
              title="Handbook"
              arrow
            >
              <IconButton 
                aria-label='Handbook'
                color='inherit'
                onClick={() => HandbookRef.current.click()}
              >
                <ArticleIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={mobileBoxStyles}
          >
            <Tooltip
              className='mobile-only'
              title="Answered"
              arrow
            >
              <QuestionAnswerIcon />
            </Tooltip>
            <Typography 
              variant="subtitle1" 
              sx={{ paddingLeft: '0.4em' }}
              className='mobile-only'
            >
              {questions.filter(x => x.answer !== "").length} {showAnswer && (<span>(<span style={ErrorTextStyles}>{questions.filter(x => x.answer !== "" && x.answer !== x.correct_answer).length}</span>)</span>)} / {questions.length}
            </Typography>
            <Typography 
              variant="subtitle1" 
              className="not-mobile"
              >
              Answered: {questions.filter(x => x.answer !== "").length} {showAnswer && (<span>(<span style={ErrorTextStyles}>{questions.filter(x => x.answer !== "" && x.answer !== x.correct_answer).length}</span>)</span>)} / {questions.length}
            </Typography>
          </Box>
        </Box>
        <Tooltip title={"Reset"} arrow className='mobile-only'>
          <IconButton 
            aria-label='Reset'
            onClick={handleResetClicked}
            color='inherit'
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Submit"} arrow className='mobile-only'>
          <IconButton 
            aria-label='Submit'
            onClick={handleSubmitClicked}
            color='inherit'
          >
            <PublishIcon />
          </IconButton>
        </Tooltip>
        <Button 
          color="inherit" 
          onClick={handleResetClicked}
          className="not-mobile"
        >
            Reset
        </Button>
        <Button 
          color="inherit" 
          onClick={handleSubmitClicked}
          className="not-mobile"
        >
            Submit
        </Button>
      </AppBar>
      <Box 
        sx={ContentStyles}
        ref={QuestionsRef}
      >
        <Box ref={ScrollToRef} sx={{ scrollBehavior: "smooth" }}></Box>
        {showAlert && <Alert severity="error">Please answer all the questions.</Alert>}
        {currentQuestions.map((question, key) => <Question
          id={question.id}
          question={question.question}
          options={question.options}
          answer={question.answer}
          correct_answer={question.correct_answer}
          handleChange={handleChange}
          key={`${question.id}-${resetCount}`}
          showAnswer={showAnswer}
        />)}
        <Pagination
          pageCount={questions.length % size !== 0 ? (Math.floor(questions.length / size)) + 1 : Math.floor(questions.length / size)}
          currentPage={currentPage}
          onChange={(page) => {
            setCurrentPage(page);
            setCurrentQuestions(questions.slice((page-1) * size, page * size));
          }}
        />
      </Box>

      <ScrollToTop 
        scrollRef={ScrollToRef}
        fadeRef={QuestionsRef}
      />
    </Container>
  );
}

export default App;
