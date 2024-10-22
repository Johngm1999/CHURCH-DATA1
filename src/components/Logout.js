// import PostWithWarning from "./PostWithWarning";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ModalWrapper from "./ModalWrapperMaterial";
// import withAlert from "./withAlert";
// import extractErrorFromRes from "../helpers/extractErrorFromRes";
import { useAuthenticationState } from "../context/Auth.context";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

function LogoutWithWarning({
    title = "Do you want to Logout ?",
    disabled = false,
}) {
    const { logout } = useAuthenticationState();
    const handleLogoutSuccess = () => {
        toast.success("Logout Success");
        logout();
    };

    return (
        <ModalWrapper
            modalTitle={title}
            modalAttrs={{ size: "md" }}
            disabled={disabled}
            renderModalBody={(closeModal) => (
                <div className="text-center" style={{ width: "100%" }}>
                    <Button
                        variant="contained"
                        color={"success"}
                        className="mx-2"
                        onClick={() => {
                            handleLogoutSuccess();
                            closeModal();
                        }}
                        sx={{ borderRadius: 10, px: 6, width: "45%" }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        color={"error"}
                        onClick={closeModal}
                        sx={{ borderRadius: 10, px: 6, width: "45%" }}
                    >
                        No
                    </Button>
                </div>
            )}
        >
            <Button variant="text" fullWidth>
                Logout
            </Button>
        </ModalWrapper>
    );
}

export default LogoutWithWarning;
