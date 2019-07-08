import Actions from "./actionsList";
import UrlRecordService from "../services/urlRecordService";
import UrlRecord from "../models/urlRecord";

export const showEditRecord = (id: number) => (dispatch: any) => {
    dispatch({
        type: Actions.INIT_DATA_FETCHING
    });

    UrlRecordService.getRecord(id)
        .then(response => {
            dispatch({
                type: Actions.SHOW_EDIT_RECORD,
                payload: response.data as unknown as UrlRecord
            });
        })
        .catch(error => {
            console.log(error);
        })
}

export const showAddNewRecord = () => (dispatch: any) => {
    dispatch({
        type: Actions.SHOW_ADD_NEW_RECORD
    });
}

export const hideEditRecord = () => (dispatch: any) => {
    dispatch({
        type: Actions.HIDE_EDIT_RECORD_VIEW
    });
}