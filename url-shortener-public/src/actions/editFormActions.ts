import Actions from "./actionsList";
import UrlRecordService from '../services/urlRecordService';
import UrlRecord from "../models/urlRecord";
import { loadGridData } from "./gridActions";
import errorTextHelper from "../helpers/errorTextHelper";
import { notification } from 'antd';

export const handleRecordFieldValueChange = (value: any, fieldName: string) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: Actions.HANDLE_EDIT_RECORD_VALUE_CHANGE,
        payload: {
            value,
            fieldName
        }
    });
}

const saveRecordSuccess = () => (dispatch: any) => {
    dispatch({
        type: Actions.SAVE_RECORD_SUCCESS
    })
}

export const saveRecord = (urlRecord: UrlRecord, isEdit: boolean) => (dispatch: any) => {
    dispatch({
        type: Actions.SAVE_RECORD
    });

    if (isEdit) {
        UrlRecordService.updateRecord(urlRecord)
            .then(response => {
                dispatch(saveRecordSuccess());
                dispatch(loadGridData());
                notification["success"]({
                    message: 'Data saved',
                    description:
                      `The changes you've done were saved successfully`,
                  });
            })
            .catch(error => {
                dispatch({
                    type: Actions.SAVE_RECORD_ERROR,
                    payload: errorTextHelper.getErrorText(error.response.data.Code)
                });
            })
    } else {
        UrlRecordService.insertRecord(urlRecord)
            .then(response => {
                dispatch(saveRecordSuccess());
                dispatch(loadGridData());
                notification["success"]({
                    message: 'Data saved',
                    description:
                      `New record was saved successfully`,
                  });
            })
            .catch(error => {
                dispatch({
                    type: Actions.SAVE_RECORD_ERROR,
                    payload: errorTextHelper.getErrorText(error.response.data.Code)
                });
            })
    }
}