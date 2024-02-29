export interface Client {
    clientId: number;
    name: string;
    address: string;
    hasContract: boolean;
    doNotify: boolean;
}