export class Payload {
    private _link:string; 
    private _title:string; 
    private _publishedAt:string;

    constructor(link:string, title:string, publishedAt:string) {
        this._link = link;
        this._title = title;
        this._publishedAt = publishedAt;
    }

    public get link() {
        return this._link;
    }

    public get title() {
        return this._title;
    }

    public get publishedAt() {
        return this._publishedAt;
    }
}