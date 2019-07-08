import React from 'react';
import GridView from '../components/grid';
import { Button } from 'antd';
import DeleteRecordModal from '../components/deleteModal';
import { connect } from 'react-redux';
import EditRecordForm from '../components/editrecord';
import { showAddNewRecord } from '../actions/mainActions';
import { loadGridData } from '../actions/gridActions';

interface IMainPageStateProps {
    isLoading: boolean;
    showRecordEditComponent: boolean;
    isEdit: boolean;
}

interface IMainPageDispatchProps {
    showAddNewRecord(): void;
    initGrid(): void;
}

class MainPageContainer extends React.Component<IMainPageStateProps & IMainPageDispatchProps> {
    componentDidMount() {
        debugger
        this.props.initGrid();
    }

    render() {
        return (
            <div className="main">
                {
                    this.props.showRecordEditComponent &&
                    <div className="edit-record-cntnr">
                        <EditRecordForm />
                    </div>
                }
                {
                    !this.props.showRecordEditComponent &&
                    <React.Fragment>
                        <div className="add-new-blk">
                            <Button type="primary" size="large" disabled={this.props.isLoading} onClick={this.props.showAddNewRecord}>
                                Add new
                            </Button>
                        </div>
                        <GridView isLoading={this.props.isLoading} />
                        <DeleteRecordModal />
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapState = (state: any) => {
    return {
        isLoading: state.mainReducer.isLoading,
        showRecordEditComponent: state.mainReducer.showRecordEditComponent,
        isEdit: state.mainReducer.isEdit
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    initGrid: () => dispatch(loadGridData()),
    showAddNewRecord: () => dispatch(showAddNewRecord())
});


const MainPage = connect<IMainPageStateProps, IMainPageDispatchProps, {}>(mapState, mapDispatchToProps)(MainPageContainer);
export default MainPage;