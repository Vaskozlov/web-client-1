import { stringToFloat } from "./string_to_float.js";
import { insertToTable,deleteRows } from "./table_updater.js"
import { createBoard, drawAreas } from "./board.js"

const x_input_element = document.getElementById("x_input")
const y_input_element = document.getElementById("y_input")
const host_name = "localhost:8080";

const board = createBoard();

x_input_element.oninput = function()
{
    console.log("print");
}

document.getElementById("clear_button").onclick = deleteRows;

window.onload = function () {
    drawAreas(board);
}

document.getElementById("check_button").onclick = function () {
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

    const x = x_value.getValue();
    const y = y_value.getValue();

    testWithRadius(x, y, "r=1");
    testWithRadius(x, y, "r=1.5");
    testWithRadius(x, y, "r=2");
    testWithRadius(x, y, "r=2.5");
    testWithRadius(x, y, "r=3");
}

function testWithRadius(x, y, r_selector_name) 
{
    const selector = document.getElementById(r_selector_name);
    
    if (selector.checked)
    {
        const r_value = stringToFloat(selector.name);

        if (r_value.isError())
        {
            alert(`Incorrect radius: ${x_value.getError()}`);
            return;
        }

        testPoint(x, y, r_value.getValue());
    }
}

async function testPoint(x, y, r) {
    const json_request = JSON.stringify(
        {
            x: x,
            y: y,
            r: r
        });

    try {
        const response = await fetch(
            `http://${host_name}/fcgi-bin/hello-world.jar`,
            {
                method: "POST",
                body: json_request
            });

        if (!response.ok) {
            handleError(response);
            return;
        }

        handleSuccess(response);
    } catch (error) {
        console.error(error);
        alert("Failed to get response from the server");
    }
}

async function handleSuccess(response) {
    try {
        const data = await response.json();
        console.log(data)

        insertToTable(
            data["x"],
            data["y"],
            data["r"],
            data["isInArea"],
            data["executionTimeNS"]
        );
    } catch (error) {
        console.error(error);
    }
}

async function handleError(response) {
    try {
        const data = await response.json();
        alert(data["error"]);
        console.log(data)
    } catch (error) {
        console.error(error);
        alert(`Server code: ${response.status}, error: ${error}`)
    }
}
