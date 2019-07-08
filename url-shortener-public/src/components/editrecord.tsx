import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { hideEditRecord } from '../actions/mainActions';
import { connect } from 'react-redux';
import UrlRecord from '../models/urlRecord';
import { handleRecordFieldValueChange, saveRecord } from '../actions/editFormActions';

interface IEditRecordStateProps {
    isEdit: boolean;
    isLoading: boolean;
    record: UrlRecord;
    error: string;
}

interface IEditRecordDispatchProps {
    handleCancel(): void;
    handleSubmit(record: UrlRecord, isEdit: boolean): void;
    handleChange(value: any, fieldName: string): void;
}

interface IEditRecordProps extends IEditRecordStateProps, IEditRecordDispatchProps {

}

class EditRecord extends React.Component<IEditRecordProps & FormComponentProps> {
    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(this.props.record, this.props.isEdit);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const headerText = this.props.isEdit ? "Edit record" : "Add new record";

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <h1>{headerText}</h1>
                </Form.Item>
                <Form.Item label="Url">
                    {getFieldDecorator('url', {
                        initialValue: this.props.record.url,
                        rules: [{ required: true, message: 'Please input valid url', pattern: new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,"gm") }],
                    })(
                        <Input
                            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Url"
                            onChange={(event) => {
                                this.props.handleChange(event.target.value, "url");
                            }}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Shortcut">
                    {getFieldDecorator('shortcut', {
                        initialValue: this.props.record.shortcut,
                        rules: [{ required: true, message: 'Please input shortcut' }],
                    })(
                        <Input
                            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Shortcut"
                            onChange={(event) => {
                                this.props.handleChange(event.target.value, "shortcut");
                            }}
                        />,
                    )}
                </Form.Item>
                <React.Fragment>
                    {
                        this.props.error &&
                        <Form.Item>
                            <Alert message={this.props.error} type="error" />
                        </Form.Item>
                    }
                </React.Fragment>
                <Form.Item>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Button type="danger" htmlType="submit" onClick={this.props.handleCancel} loading={this.props.isLoading} disabled={this.props.isLoading}>
                                Cancel
                            </Button>
                        </Col>
                        <Col span={8}>
                            {
                                this.props.isEdit &&
                                <Button type="primary" htmlType="submit" loading={this.props.isLoading} disabled={this.props.isLoading}>
                                    Save
                                </Button>
                            }
                            {
                                !this.props.isEdit &&
                                <Button type="primary" htmlType="submit" loading={this.props.isLoading} disabled={this.props.isLoading}>
                                    Add
                                </Button>
                            }
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        )
    }
}

const mapState = (state: any) => {
    return {
        isLoading: state.recordReducer.isLoading,
        isEdit: state.recordReducer.isEdit,
        record: state.recordReducer.recordToEdit,
        error: state.recordReducer.saveRecordError
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    handleCancel: () => dispatch(hideEditRecord()),
    handleSubmit: (record: UrlRecord, isEdit: boolean) => dispatch(saveRecord(record, isEdit)),
    handleChange: (value: any, fieldName: string) => dispatch(handleRecordFieldValueChange(value, fieldName))
});


const EditRecordForm = connect<IEditRecordStateProps, IEditRecordDispatchProps, {}>(mapState, mapDispatchToProps)(Form.create<IEditRecordProps & FormComponentProps>({ name: 'url_record_data' })(EditRecord));
export default EditRecordForm;