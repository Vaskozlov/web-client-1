import { Result } from "./result.js";

const float_check_regex = /^[+-]?\d+([.,]\d*)?$/;

export function stringToFloat(x) {
    if (typeof (x) != "string") {
        return Result.error(new TypeError("Not a string type provided"));
    }

    x = x.replace(",", ".");

    if (float_check_regex.test(x)) {
        return Result.success(parseFloat(x));
    }

    return Result.error(new TypeError("Input does not represent a float"));
}
