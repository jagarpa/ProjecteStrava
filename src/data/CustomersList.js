export { CustomersList }

class CustomersList {

    constructor() {

        this.customers = [
            {
                name: "Javier García Pardo",
                client_id: 72241,
                client_secret: "5e89994ecfc49081c71b93bd89e2da48ca4ce308",
                refresh_token: "6ebd1122a2f8d0f9fa8e09fa2238302d7938646f",
                equipment: [ {btt: "b8648862", road: "b8648860"}]
    
            },
            {
                name: "Raul Cano Calabuig",
                client_id: 73012,
                client_secret: "b54829e76b37ccecc3864b90e64a8a6979a5ecb2",
                refresh_token: "fec814a928e9cdf7b67cbe2539a018d682a84409",
                equipment: [ {btt: null, road: null}]
            }
        ]
    }

    get customersList() {
        return this.customers;
    }
}