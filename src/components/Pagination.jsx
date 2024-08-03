import { 
    Stack,
    Pagination
} from "@mui/material";

export default function PaginationElement ({ pageCount, currentPage, onChange }) {
    return (
        <Stack 
          spacing={2}
          sx={{
            alignSelf: "center"
          }}
        >
          <Pagination 
            count={pageCount} 
            page={currentPage}
            onChange={(e, page) => onChange(page)}
            size="large"
          />
        </Stack>
    )
}