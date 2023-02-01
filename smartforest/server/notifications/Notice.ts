export class Notice {
    private time: string = "";
    private event: string = "";
    private good: boolean = true;
    public constructor(event: string,good:boolean,time = new Date().toLocaleString()) {
        this.event = event
        this.time = time;
        this.good = good;
    }
   
    get asObject() {
        return {
            time: this.time,
            event: this.event,
        }
    }
}