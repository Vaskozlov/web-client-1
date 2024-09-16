const is_in_area_table = document.getElementById("is_in_area_table")

export function insertToTable() {
    for (let i = 1; i != 100; ++i){
        const row = is_in_area_table.insertRow(1);
        
        let x_cell = row.insertCell(0);
        let y_cell = row.insertCell(1);
        let r_cell = row.insertCell(2);
        let is_in_area_cell = row.insertCell(3);
        let time_ms_cell = row.insertCell(4);

        x_cell.innerHTML = "1";
        y_cell.innerHTML = "2";
        r_cell.innerHTML = "2";
        is_in_area_cell.innerHTML = "true";
        time_ms_cell.innerHTML = "0ms";
        }
}
