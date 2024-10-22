// import ModalWrapper from "./ModalWrapper";
import PostWithWarning from "./PostWithWarning";
import { ReactComponent as Delete } from "../asset/icons/Delete.svg";
import withAlert from "./withAlert";
import extractErrorFromRes from "../helpers/extractErrorFromRes";
import RestorePageOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import ModalWrapper from "./ModalWrapperMaterial";

function DeleteWithWarning({
    title,
    endpoint,
    configBody,
    onAfterDelete,
    disabled,
    showAlert,
    type = "",
    DeleteIcon,
}) {
    return (
        <ModalWrapper
            modalTitle={title}
            modalAttrs={{ size: "md" }}
            disabled={disabled}
            renderModalBody={(closeModal) => (
                <PostWithWarning
                    onSuccess={() => {
                        closeModal();
                        onAfterDelete();
                    }}
                    onError={(err) =>
                        showAlert("error", extractErrorFromRes(err))
                    }
                    onCancel={closeModal}
                    endpoint={endpoint}
                    configBody={configBody}
                    dangerVarient={DeleteIcon ? "green" : "error"}
                    successVarient={DeleteIcon ? "error" : "success"}
                />
            )}
        >
            {type === "restore" ? (
                <RestorePageOutlinedIcon className="btnAnime" />
            ) : DeleteIcon ? (
                <DeleteIcon className="btnAnime" />
            ) : (
                <Delete className="btnAnime" />
            )}
        </ModalWrapper>
    );
}

export default withAlert(DeleteWithWarning);
