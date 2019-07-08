import React from 'react';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import UrlRecord from '../models/urlRecord';
import { showDeleteRecordModal } from '../actions/gridActions';
import { showEditRecord } from '../actions/mainActions';
import withLoading from './loader';

interface IGridViewStateProps {
    urlRecords: UrlRecord[];
}

interface IGridViewDispatchProps {
    showDeleteRecordModal(id: number): void;
    showEditRecord(id: number): void;
}

class GridViewContainer extends React.Component<IGridViewStateProps & IGridViewDispatchProps> {
    getColums() {
        return [
            {
                title: 'Url',
                dataIndex: 'url',
                key: 'url',
                render: (text: string) => <a href={text}>{text}</a>,
            },
            {
                title: 'Shortcut',
                dataIndex: 'shortcut',
                key: 'shortcut',
                render: (text: string) => <a href={text}>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <a href="javascript:;" onClick={() => { this.props.showEditRecord(record.id) }}>Edit</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.props.showDeleteRecordModal(record.id) }}>Delete</a>
                    </span>
                ),
            },
        ];
    }

    render() {
        return (
            <div className="grid">
                <Table columns={this.getColums()} dataSource={this.props.urlRecords} pagination={false} rowKey="id" />
            </div>
        )
    }
}

const mapState = (state: any) => {
    return {
        urlRecords: state.mainReducer.urlRecords
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    showDeleteRecordModal: (id: number) => dispatch(showDeleteRecordModal(id)),
    showEditRecord: (id: number) => dispatch(showEditRecord(id))
});

const GridView = withLoading(connect<IGridViewStateProps, IGridViewDispatchProps, {}>(mapState, mapDispatchToProps)(GridViewContainer));
export default GridView;