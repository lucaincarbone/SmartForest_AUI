import fs from 'fs';
import { Tree } from "~/server/Tree";
import { Notice } from './notifications/Notice';
import { Position } from './Position';

export class LoaderResponse {
    private _leaves: number;
    private _globalExperience: number;
    private _trees: Tree[];

    constructor(leaves: number, globalExperience: number, trees: Tree[]) {
        this._leaves = leaves;
        this._globalExperience = globalExperience;
        this._trees = trees;
    }

    get leaves() {
        return this._leaves;
    }

    get globalExperience() {
        return this._globalExperience;
    }

    get trees() {
        return this._trees;
    }
}

export class ModelLoader {
    private _pathToJsonFile: string = "./server/gameState.json";

    private static _instance: ModelLoader;

    //FIXME insert correct initial numbers
    private constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private loadTrees(parsedData: any) {
        let trees: Tree[] = [];
        let tree_list = parsedData.trees;

        for (let i = 0; i < tree_list.length; i++) {
            let position: Position = new Position(tree_list[i].position._x, tree_list[i].position._y);
            let level = tree_list[i].level;
            let experience = tree_list[i].experience;
            let tree: Tree = new Tree(position, level, experience);
            trees.push(tree);
        }
        return trees;
    }

    public loadData() {
        let data = fs.readFileSync(this._pathToJsonFile);
        let parsedData = JSON.parse(data.toString());
        let leaves: number = parsedData.leaves;
        let globalExperience: number = parsedData.globalExperience;
        let trees: Tree[] = this.loadTrees(parsedData);
        let loaderResponse: LoaderResponse = new LoaderResponse(leaves, globalExperience, trees);
        return loaderResponse;
    }

    public loadNotifications() {
        let data = fs.readFileSync(this._pathToJsonFile);
        let parsedData = JSON.parse(data.toString());
        let notifications: Notice[] = [];
        let notifications_list = parsedData.notifications;

        for (let i = 0; i < notifications_list.length; i++) {
            let time = notifications_list[i].time;
            let event = notifications_list[i].event;
            let good = notifications_list[i].good;
            let notice: Notice = new Notice(event, good, time);
            notifications.push(notice);
        }
        return notifications;
    }

}
