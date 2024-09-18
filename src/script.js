import {stringToFloat} from "./string_to_float.js";
import {insertToTable} from "./table_updater.js"
import {createBoard, drawAreas} from "./board.js"

const x_input_element = document.getElementById("x_input")
const y_input_element = document.getElementById("y_input")
const r_select_element = document.getElementById("r_input")
const host_name = "localhost:8080";

const board = createBoard();

window.onload = function () {
    drawAreas(board);
}

document.getElementById("check_button")
    .onclick =
    function () {
        const x_value = stringToFloat(x_input_element.value);

        if (x_value.isError()) {
            alert(`Incorrect x value: ${x_value.getError()}`);
            return;
        }

        const y_value = stringToFloat(y_input_element.value);

        if (y_value.isError()) {
            alert(`Incorrect y value: ${y_value.getError()}`);
            return;
        }
         
        const r_value = stringToFloat(r_select_element.value)

        if (r_value.isError()) {
            alert(`Incorrect r value: ${r_value.getError()}`);
            return;
        }

        testPoint(
            x_value.getValue(),
            y_value.getValue(),
            r_value.getValue()
        );
    }

function testPoint(x, y, r) 
{
    const json_request = JSON.stringify(
        {
            x: x,
            y: y,
            r: r
        });

    fetch(`http://${host_name}/fcgi-bin/hello-world.jar`,
        {
            method: "POST",
            body: json_request
        })
        .then(response => {
            console.log(`Status: ${response.status}`);

            if (!response.ok) {
                handleError(response);
                return;
            }

            handleSuccess(response);
        })   
}

function handleSuccess(response)
{
    response.json()

    .then(data => {
        console.log(data)
        
        addPoint(
            data["x"],
            data["y"],
            data["r"],
            data["isInArea"],
            data["executionTimeMS"]
        );
    })
    .catch(error => {
        console.error(`Error: ${error}, data: ${data}`);
    });
}

function handleError(response)
{
    response.json()
    .then(data => {
        alert(data["error"]);
        console.log(data)
    })
    .catch(error => {
        console.error(data);
    });
}

function addPoint(x, y, r, result, timeMS) {
    insertToTable(x, y, r, result, timeMS);
}
