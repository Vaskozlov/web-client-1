import { Result } from "./result.js";

const float_check_regex = /^\d+([.,]\d*)?$/;

export function stringToFloat(x) {
    if (typeof (x) != "string") {
        return Result.error(new TypeError("not a string"));
    }

    x = x.replace(",", ".");

    if (float_check_regex.test(x)) {
        return Result.success(parseFloat(x));
    }

    return Result.error(new TypeError("string does not represent a float"));
}
