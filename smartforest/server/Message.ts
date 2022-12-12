export class Message{
    private _text: String;
    private _isSuccesful: boolean;
    constructor(text:String, isSuccesful: boolean){
        this._text = text;
        this._isSuccesful = isSuccesful;
    }
}