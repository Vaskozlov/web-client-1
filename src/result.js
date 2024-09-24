export class Result {
    constructor(value, error) {
        if (!(error instanceof Error) && error != null) {
            throw new TypeError("Error type expected in Result");
        }

        this.value = value;
        this.error = error;
    }

    static success(value) {
        return new Result(value, null);
    }

    static error(error) {
        return new Result(null, error);
    }

    isSuccess() {
        return this.error == null;
    }

    isError() {
        return !this.isSuccess();
    }

    getValue() {
        if (this.isSuccess()) {
            return this.value;
        }

        throw new Error("Result is not in success state");
    }

    getError() {
        if (this.isError()) {
            return Error(this.error);
        }

        throw new Error("Result is not in error state");
    }
}