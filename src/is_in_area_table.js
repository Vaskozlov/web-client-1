import {formatTimeNs} from "./format_time_ns.js";

let current_cell = 1;
const is_in_area_table = document.getElementById("is_in_area_table")

export function insertIntoTable(x, y, r, is_in_area, time_ns) {
    const row = is_in_area_table.insertRow(current_cell);

    for (let i = 0; i !== 3; ++i) {
        row.insertCell(i).innerHTML = arguments[i];
    }

    const is_in_area_cell = row.insertCell(3);
    const time_ns_cell = row.insertCell(4);

    is_in_area_cell.innerHTML = is_in_area ? "yes" : "no";
    time_ns_cell.innerHTML = formatTimeNs(time_ns);

    ++current_cell;
}

export function deleteRows() {
    for (let i = 1; i !== current_cell; ++i) {
        is_in_area_table.deleteRow(1);
    }

    current_cell = 1;
}
