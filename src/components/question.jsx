import { useEffect, useState } from 'react';
// MUI
import {
    Avatar,
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { blue, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Question = ({ id, question, options, handleChange, correct_answer, showAnswer }) => {

    const [value, setValue] = useState(null);

    return (
        <FormControl>
            <FormLabel sx={{ color: "#000 !important", fontWeight: "700" }}>{`${id}. ${question}`}</FormLabel>
            <RadioGroup
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleChange(question, e.target.value);
                }}
            >
                {options.map(
                    (option, index) => <Box 
                        component={'div'} 
                        sx={{ display: "flex", flexFlow: "row", alignItems: "center", paddingTop: '0.5em', paddingBottom: '0.5em' }}
                        key={index}
                    >
                        <FormControlLabel
                            value={option} 
                            control={<Radio />} 
                            label={option}
                        />
                        {showAnswer && option === value && correct_answer !== option && <Avatar sx={{ bgcolor: red[500], width: "20px", height: "20px" }}>
                            <ClearIcon sx={{ width: "0.5em", height: "0.5em" }} />
                        </Avatar>}
                        {showAnswer && correct_answer === option && <Avatar sx={{ bgcolor: blue[500], width: "20px", height: "20px" }}>
                            <CheckIcon sx={{ width: "0.5em", height: "0.5em" }} />
                        </Avatar>}
                    </Box>)}
            </RadioGroup>
        </FormControl>
    )
};

export default Question;