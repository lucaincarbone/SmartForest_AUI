export class Tree {
    private _position_x: number
    private _position_y: number
    private _level: number
    private _experience: number

    constructor(position_x: number, position_y: number, level: number, experience: number) {
        this._position_x = position_x;
        this._position_y = position_y;
        this._level = level;
        this._experience = experience;
    }

    get position_x(): number {
        return this._position_x;
    }

    get position_y(): number {
        return this._position_y;
    }

    get level(): number {
        return this._level;
    }

    get experience(): number {
        return this._experience;
    }

    set level(value: number) {
        this._level = value;
    }

    set experience(value: number) {
        this._experience = value;
    }
}
