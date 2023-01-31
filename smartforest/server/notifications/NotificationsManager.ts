import { Notice } from "./Notice";


export class NotificationsManager {
    private maxNumber: number = 10;
    private notificationsList: Array<Notice> = [];

    public constructor(maxNumber: number) {
        this.maxNumber = maxNumber;
    }

    /**
     * AddNewNotice add a new notification to the list with event the specified string
     * If the number of notification exeeds the max number the oldest one is popped
     * @param event the string to store describing the event
     */
    public AddNewNotice(event: string,good:boolean) {
        let newNotice = new Notice(event,good);
        this.notificationsList.push(newNotice);
        if (this.notificationsList.length > this.maxNumber) {
            this.notificationsList.shift();
        }
    }

    /**
    * Getter for the full notification list (inverted for frontend commodity)
    */
    get NotificationsList(): Array<Notice> {
        let inverted = this.notificationsList.slice().reverse();
        return inverted;
    }
    /**
    * Getter for the number of stored notifications
    */
    get NotificationsNumber(): number {
        return this.notificationsList.length;
    }
}
