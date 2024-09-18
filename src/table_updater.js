const is_in_area_table = document.getElementById("is_in_area_table")
let current_cell = 1;

function formatTimeFromNs(time_ns) {
    const time_us = time_ns / 1000;
    const time_ms = time_us / 1000;

    if (time_ms > 1) {
        return `${time_ms.toFixed(2)}ms`;
    }

    if (time_us > 1) {
        return `${time_us.toFixed(2)}us`;
    }

    return `${time_ns}ns`;
}

export function insertToTable(x, y, r, is_in_area, time_ns) {
    const row = is_in_area_table.insertRow(current_cell);

    let x_cell = row.insertCell(0);
    let y_cell = row.insertCell(1);
    let r_cell = row.insertCell(2);
    let is_in_area_cell = row.insertCell(3);
    let time_ns_cell = row.insertCell(4);

    x_cell.innerHTML = x.toString();
    y_cell.innerHTML = y.toString();
    r_cell.innerHTML = r.toString();
    is_in_area_cell.innerHTML = is_in_area.toString();
    time_ns_cell.innerHTML = formatTimeFromNs(time_ns);

    ++current_cell;
}
