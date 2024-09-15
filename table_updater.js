const is_in_area_table = document.getElementById("is_in_area_table")

export function insertToTable() {
    is_in_area_table.insertRow(0);
    
    let x_cell = is_in_area_table.insertCell(0);
    let y_cell = is_in_area_table.insertCell(1);
    let is_in_area_cell = is_in_area_table.insertCell(2);
    let time_ms_cell = is_in_area_cell.insertCell(3);

    x_cell.innerHTML = "1";
    y_cell.innerHTML = "2";
    is_in_area_cell.innerHTML = "true";
    time_ms_cell.innerHTML = "0ms";
}
