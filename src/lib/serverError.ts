class ServerError extends Error {
    code: number;
    constructor(message: string, errorCode: number){
        super(message);
        this.code = errorCode;
    }
}

export default ServerError;