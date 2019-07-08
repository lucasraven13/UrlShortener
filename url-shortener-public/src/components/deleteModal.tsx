import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { hideDeleteRecordModal, deleteRecord } from '../actions/gridActions';

interface IDeleteRecordModalDispatchProps {
    hideModal(): void;
    handleOk(id: number): void;
}

interface IDeleteRecordModalStateProps {
    visible: boolean;
    confirmLoading: boolean;
    recordId: number;
}

class DeleteRecordModalComponent extends React.Component<IDeleteRecordModalStateProps & IDeleteRecordModalDispatchProps>{
    handleOkClick = () => {
        this.props.handleOk(this.props.recordId);
    }

    render() {
        return (
            <Modal
                title={"Remove record"}
                visible={this.props.visible}
                onOk={this.handleOkClick}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.hideModal}
            >
                <p>Are you sure you want to remove this record?</p>
            </Modal >
        )
    }
}

const mapState = (state: any) => {
    return {
        recordId: state.mainReducer.recordToDeleteId,
        visible: state.mainReducer.deleteModalVisible,
        confirmLoading: state.mainReducer.isLoading
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    hideModal: () => dispatch(hideDeleteRecordModal()),
    handleOk: (id: number) => dispatch(deleteRecord(id))
});

const DeleteRecordModal = connect<IDeleteRecordModalStateProps, IDeleteRecordModalDispatchProps, {}>(mapState, mapDispatchToProps)(DeleteRecordModalComponent);
export default DeleteRecordModal;