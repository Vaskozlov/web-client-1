import {formatTimeNs} from "./format_time_ns.js";

let current_cell = 1;
const is_in_area_table = document.getElementById("is_in_area_table")

export function insertIntoTable(x, y, r, is_in_area, time_ns) {
    const row = is_in_area_table.insertRow(current_cell);

    const x_cell = row.insertCell(0);
    const y_cell = row.insertCell(1);
    const r_cell = row.insertCell(2);
    const is_in_area_cell = row.insertCell(3);
    const time_ns_cell = row.insertCell(4);

    x_cell.innerHTML = x.toString();
    y_cell.innerHTML = y.toString();
    r_cell.innerHTML = r.toString();
    is_in_area_cell.innerHTML = is_in_area ? "yes" : "false";
    time_ns_cell.innerHTML = formatTimeNs(time_ns);

    ++current_cell;
}

export function deleteRows() {
    for (let i = 1; i !== current_cell; ++i) {
        is_in_area_table.deleteRow(1);
    }

    current_cell = 1;
}
