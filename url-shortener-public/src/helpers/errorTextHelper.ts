const errorCodes: Map<string, string> = new Map([["record_already_exists", "Record with such shortcut already exists"]]);

export default class errorTextHelper {
    static getErrorText(code:string) {
       if(errorCodes.get(code)){
            return errorCodes.get(code);
       }
       return "Some error occured";
    }
}