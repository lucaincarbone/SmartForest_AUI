import { Position } from "./Position";

export class Tree {
    private _position: Position
    private _level: number
    private _experience: number

    constructor(position:Position, level: number, experience: number) {
        this._position = position
        this._level = level;
        this._experience = experience;
    }

    get position_x(): number {
        return this._position.x;
    }

    get position_y(): number {
        return this._position.y;
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
