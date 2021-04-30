export class TagResult {

    constructor(public id: string,
                public time: Date[]) {
    }

    public getTimeAsString(): string[] {
        return this.time.map<string>((time) => {
            return `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}.${time.getUTCMilliseconds()}`;
        });
    }
}
