import ModalWrapper from './ModalWrapper';
import PostWithWarning from './PostWithWarning';
import { ReactComponent as Delete } from '../asset/icons/Delete.svg';
import withAlert from './withAlert';
import extractErrorFromRes from '../helpers/extractErrorFromRes';

function DeleteWithWarning({
    title,
    endpoint,
    configBody,
    onAfterDelete,
    disabled,
    showAlert,
}) {
    return (
        <ModalWrapper
            modalTitle={'Delete ' + title}
            modalAttrs={{ size: 'sm' }}
            disabled={disabled}
            renderModalBody={(closeModal) => (
                <PostWithWarning
                    onSuccess={() => {
                        closeModal();
                        onAfterDelete();
                    }}
                    onError={(err) =>
                        showAlert('error', extractErrorFromRes(err))
                    }
                    onCancel={closeModal}
                    endpoint={endpoint}
                    configBody={configBody}
                />
            )}
        >
            <Delete className='btnAnime' />
        </ModalWrapper>
    );
}

export default withAlert(DeleteWithWarning);
