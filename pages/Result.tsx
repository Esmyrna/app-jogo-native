export class Result {
    public won: boolean;
    public date : Date;

    constructor(wonMatch: boolean, date: Date) {
        this.won = wonMatch;
        this.date = date;
    }
}