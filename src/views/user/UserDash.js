import YouthDataCollectionForm from "./YothForm";
import YouthModal from "./YouthModal";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useAuthenticationState } from "../../context/Auth.context";
import churchImg from "../../asset/img/church.jpeg";

function UserDash() {
    // You can adjust the number of modals here
    const { logout } = useAuthenticationState();
    const modals = [
        {
            id: 1,
            bg: "blue",
            displayText: "Add Youth Data",
            form: YouthDataCollectionForm,
        },
        {
            id: 2,
            bg: "violet",
            displayText: "Add Parish Data",
            form: () => <>Form Not Created</>,
        },
        {
            id: 3,
            bg: "green",
            displayText: "Add Global Data",
            form: () => <>Form Not Created</>,
        },
    ];

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    boxShadow: 3,
                    borderRadius: 5,
                    // bgcolor: "#fff",
                    background:
                        "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(122,5,217,1) 100%)",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    CHURCH DATA PORTAL
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        fontWeight: 600,
                    }}
                    onClick={logout} // Assuming you have a logout function
                >
                    Logout
                </Button>
            </Box>

            <Box
                style={{
                    backgroundImage: `url(${churchImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "80vh",
                    borderRadius: 10,
                }}
                sx={{
                    flexGrow: 1,
                    // p: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    mt: 2,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {modals.map((item, index) => (
                        <Grid
                            item
                            // xs={12}
                            // sm={3}
                            key={item.id}
                            sx={{
                                bgcolor: "#b2e5eb",
                                // borderLeft: `10px solid ${item.bg}`,
                                // borderRight: `10px solid ${item.bg}`,
                                mr: 2,
                                p: 2,
                                borderRadius: 5,
                                boxShadow: 4,
                            }}
                        >
                            <YouthModal
                                text={item.displayText}
                                Form={item.form}
                                bg={item.bg}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default UserDash;
