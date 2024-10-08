import { useState } from 'react';
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

export default function Question ({ sequence, question, options, handleChange, correct_answer, showAnswer, answer }) {

    const [value, setValue] = useState(answer);

    return (
        <FormControl
            sx={{ padding: "0.5em" }}
        >   
            <FormLabel sx={{ color: "#000 !important", fontWeight: "700" }}>{`${sequence}. ${question}`}</FormLabel>
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
                        sx={{ display: "flex", flexFlow: "row", alignItems: "center", paddingTop: '0.2em', paddingBottom: '0.2em' }}
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