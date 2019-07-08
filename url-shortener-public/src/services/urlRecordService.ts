import axios from 'axios';
import UrlRecord from '../models/urlRecord';

const BASE_URL = "https://localhost:44391/api/urls";
const HEADERS = {
    'Content-Type': 'application/json',
    'Pragma': 'no-cache'
};

export default class UrlRecordService {
    static getAllRecords() {
        return axios.get(`${BASE_URL}`,
            {
                headers: HEADERS
            });
    }

    static removeRecord(id: number) {
        return axios.delete(`${BASE_URL}/${id}`,
            {
                headers: HEADERS
            });
    }

    static getRecord(id: number) {
        return axios.get(`${BASE_URL}/${id}`,
            {
                headers: HEADERS
            });
    }

    static updateRecord(urlRecord: UrlRecord) {
        return axios.put(`${BASE_URL}/${urlRecord.id}`,
            urlRecord,
            {
                headers: HEADERS
            });
    }

    static insertRecord(urlRecord: UrlRecord) {
        return axios.post(`${BASE_URL}`,
            urlRecord,
            {
                headers: HEADERS
            });
    }

    static useShortCut(shortcut: string){
        return axios.post(`${BASE_URL}/${shortcut}`,
        {},
        {
            headers: HEADERS
        });
    }
}