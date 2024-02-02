class ServerError extends Error {
    code: number;
    serverMessage: string;
    constructor(message: string, errorCode: number, serverMessage: string){
        super(message);
        this.code = errorCode;
        this.serverMessage = serverMessage;
    }
}

export default ServerError;