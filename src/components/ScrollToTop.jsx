import {
  Box,
  Fade,
  Fab,
  useScrollTrigger
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop ({ fadeRef, scrollRef }) {

  const trigger = useScrollTrigger({
    target: fadeRef.current,
    disableHysteresis: true,
    threshold: 100,
  });
  
  return (
    <Fade in={trigger}>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 40, right: 20 }}
        onClick={() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  )
}