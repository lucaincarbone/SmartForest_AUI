export class Message{
    private _text: string;
    private _isSuccesful: boolean;
    constructor(text:string, isSuccesful: boolean){
        this._text = text;
        this._isSuccesful = isSuccesful;
    }
}