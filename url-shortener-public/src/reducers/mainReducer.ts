import Actions from "../actions/actionsList";
import UrlRecord from "../models/urlRecord";

const initialState = {
    isLoading: false,
    deleteModalVisible: false,
    recordToDeleteId: null,
    showRecordEditComponent: false,
    urlRecords: []
}

export default (state = initialState, action: { type: any; payload: any; }) => {
    let newState = { ...state };

    switch (action.type) {
        case Actions.INIT_DATA_FETCHING:
            newState = {
                ...newState,
                isLoading: true
            };
            break;
        case Actions.SET_GRID_DATA:
            newState = {
                ...newState,
                isLoading: false,
                urlRecords: action.payload
            };
            break;
        case Actions.SHOW_DELETE_RECORD_MODAL:
            newState = {
                ...newState,
                deleteModalVisible: true,
                recordToDeleteId: action.payload
            }
            break;
        case Actions.HIDE_DELETE_RECORD_MODAL:
            newState = {
                ...newState,
                deleteModalVisible: false,
                recordToDeleteId: null
            }
            break;
        case Actions.SHOW_ADD_NEW_RECORD:
            newState = {
                ...newState,
                showRecordEditComponent: true
            }
            break;
        case Actions.SHOW_EDIT_RECORD:
            newState = {
                ...newState,
                showRecordEditComponent: true
            }
            break;
        case Actions.HIDE_EDIT_RECORD_VIEW:
            newState = {
                ...newState,
                showRecordEditComponent: false
            }
            break;
        case Actions.SAVE_RECORD:
            newState = {
                ...newState,
                isLoading: true
            };
            break;
        case Actions.LOADING_FINISHED:
            newState = {
                ...newState,
                isLoading: false
            };
            break;
        case Actions.SAVE_RECORD_SUCCESS:
            newState = {
                ...newState,
                showRecordEditComponent: false
            };
            break;
        default:
            return newState;
    }
    return newState;
}