const is_in_area_table = document.getElementById("is_in_area_table")
let current_cell = 1;

export function insertToTable(x, y, r, is_in_area, time_ms) {
    const row = is_in_area_table.insertRow(current_cell);
    
    let x_cell = row.insertCell(0);
    let y_cell = row.insertCell(1);
    let r_cell = row.insertCell(2);
    let is_in_area_cell = row.insertCell(3);
    let time_ms_cell = row.insertCell(4);

    x_cell.innerHTML = x.toString();
    y_cell.innerHTML = y.toString();
    r_cell.innerHTML = r.toString();
    is_in_area_cell.innerHTML = is_in_area.toString();
    time_ms_cell.innerHTML = `${time_ms}ms`;

    ++current_cell;
}
