export class Notice {
    private time: string = "";
    private event: string = "";
    public constructor(event: string) {
        this.event = event
        this.time = new Date().toLocaleString();
    }
    get asObject() {
        return {
            time: this.time,
            event: this.event,
        }
    }
}