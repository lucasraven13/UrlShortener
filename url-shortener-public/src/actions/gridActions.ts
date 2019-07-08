import Actions from "./actionsList";
import UrlRecordService from '../services/urlRecordService';
import UrlRecord from "../models/urlRecord";
import { notification } from "antd";

export const loadGridData = () => (dispatch: any) => {
    dispatch({
        type: Actions.INIT_DATA_FETCHING
    });

    UrlRecordService.getAllRecords()
        .then(response => {
            dispatch(setGridData(response.data as unknown as UrlRecord[]));
        })
        .catch(error => {
            console.log(error);
        })
};

export const setGridData = (urlRecords: UrlRecord[]) => (dispatch: (arg0: { type: string; payload: UrlRecord[]; }) => void) => {
    dispatch({
        type: Actions.SET_GRID_DATA,
        payload: urlRecords
    });
}

export const showDeleteRecordModal = (id: number) => (dispatch: any) => {
    dispatch({
        type: Actions.SHOW_DELETE_RECORD_MODAL,
        payload: id
    });
}

export const hideDeleteRecordModal = () => (dispatch: any) => {
    dispatch({
        type: Actions.HIDE_DELETE_RECORD_MODAL
    });
}

export const deleteRecord = (id: number) => (dispatch: any) => {
    UrlRecordService.removeRecord(id)
        .then(response => {
            dispatch(loadGridData());
            dispatch(hideDeleteRecordModal());
            notification["success"]({
                message: 'Record removed'
              });
        })
        .catch(error => {
            console.log(error);
        })
};