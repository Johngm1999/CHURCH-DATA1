import YouthModal from "./YouthModal";
import { Box, Grid } from "@mui/material";

function UserDash() {
    // You can adjust the number of modals here
    const modals = [1, 2, 3]; // Example: three modals

    return (
        <Box
            sx={{
                flexGrow: 1,
                // p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {modals.map((_, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        key={index}
                        sx={{ bgcolor: "red", p: 4, mr: 2 }}
                    >
                        <YouthModal />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default UserDash;
