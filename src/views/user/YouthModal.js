import ModalWrapper from "../../components/ModalWrapper";
import YouthDataCollectionForm from "./YothForm";

function YouthModal() {
    return (
        <ModalWrapper
            modalTitle={"Add Youth Data"}
            modalAttrs={{
                size: "lg",
            }}
            renderModalBody={(closeModal) => (
                <YouthDataCollectionForm
                    onAfterSubmit={() => {
                        closeModal();
                        // showAlert(
                        //     "success",
                        //     `The Record has been updated successfully`
                        // );
                        // reFetch();
                    }}
                    onCancel={closeModal}
                />
            )}
        >
            Click Me
        </ModalWrapper>
    );
}

export default YouthModal;
