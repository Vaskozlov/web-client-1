import {formatTimeNs} from "./format_time_ns.js";

let current_cell = 1;
const is_in_area_table = document.getElementById("is_in_area_table")

export function insertIntoTable({x, y, r, is_in_area, time_ns}) {
    const row = is_in_area_table.insertRow(current_cell);

    row.insertCell(0).innerHTML = x;
    row.insertCell(1).innerHTML = y;
    row.insertCell(2).innerHTML = r;
    row.insertCell(3).innerHTML = is_in_area ? "yes" : "no";
    row.insertCell(4).innerHTML = formatTimeNs(time_ns)

    ++current_cell;
}

export function deleteRows() {
    for (let i = 1; i !== current_cell; ++i) {
        is_in_area_table.deleteRow(1);
    }

    current_cell = 1;
}
