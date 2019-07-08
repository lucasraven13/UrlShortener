import Actions from "../actions/actionsList";
import UrlRecord from "../models/urlRecord";

const initialState = {
    isEdit: false,
    isLoading: false,
    recordToEdit: new UrlRecord(),
    saveRecordError: null
}

export default (state = initialState, action: { type: any; payload: any; }) => {
    let newState = { ...state };

    switch (action.type) {
        case Actions.SHOW_ADD_NEW_RECORD:
            newState = {
                ...newState,
                isEdit: false,
                recordToEdit: new UrlRecord()
            }
            break;
        case Actions.SHOW_EDIT_RECORD:
            newState = {
                ...newState,
                isEdit: true,
                isLoading: false,
                recordToEdit: action.payload
            }
            break;
        case Actions.HANDLE_EDIT_RECORD_VALUE_CHANGE:
            let newRecord = {
                ...newState.recordToEdit
            } as any;
            newRecord[action.payload.fieldName] = action.payload.value;
            newState = {
                ...newState,
                recordToEdit: newRecord
            }
            break;
        case Actions.SAVE_RECORD:
            newState = {
                ...newState,
                isLoading: true
            };
            break;
        case Actions.SAVE_RECORD_ERROR:
            newState = {
                ...newState,
                isLoading: false,
                saveRecordError: action.payload
            };
            break;
        case Actions.SAVE_RECORD_SUCCESS:
            newState = {
                ...newState,
                isLoading: false,
                saveRecordError: null,
                isEdit: false,
                recordToEdit: new UrlRecord()
            }
            break;
        default:
            return newState;
    }
    return newState;
}