import {Result} from "./result.js";

const floating_point_number_regex = /^[+-]?\d+([.,]\d*)?$/;

export function stringToFloat(x) {
    if ((typeof x) !== 'string' && !(x instanceof String)) {
        return Result.error("Not a string type provided");
    }

    if (floating_point_number_regex.test(x)) {
        x = x.replace(",", ".");
        return Result.success(parseFloat(x));
    }

    return Result.error("Input does not represent a float");
}
