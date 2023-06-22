export class Account {
    constructor(
        public accountNumber : number,
        public type  : string,
        public balance : number,
        public id_client : number,
        public openedAt : string,
        public cardType: string
    ){}
}
