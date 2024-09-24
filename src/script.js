import {stringToFloat} from "./string_to_float.js";
import {deleteRows, insertIntoTable} from "./table_updater.js"
import {createBoard, drawAreas} from "./board.js";

const host_name = "localhost:8080";

const x_input_element = document.getElementById("x_input")
const y_input_element = document.getElementById("y_input")
const x_input_error = document.getElementById("x_input_error")
const y_input_error = document.getElementById("y_input_error")
const board = createBoard();

x_input_element.oninput = function () {
    x_input_error.textContent = "";
}

y_input_element.oninput = function () {
    y_input_error.textContent = "";
}

window.onload = function () {
    drawAreas(board);
}

document.getElementById("clear_button").onclick = deleteRows;

document.getElementById("check_button").onclick = function () {
    const x_value = stringToFloat(x_input_element.value);

    if (x_value.isError()) {
        const error = x_value.getError();
        x_input_error.textContent = error.message;
        return;
    }

    const y_value = stringToFloat(y_input_element.value);

    if (y_value.isError()) {
        const error = x_value.getError();
        y_input_error.textContent = error.message;
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

function testWithRadius(x, y, r_selector_name) {
    const selector = document.getElementById(r_selector_name);

    if (selector.checked) {
        const r_value = stringToFloat(selector.name);

        if (r_value.isError()) {
            alert(`Incorrect radius: ${r_value.getError()}`);
            return;
        }

        testPoint(x, y, r_value.getValue()).then(r => r);
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
                body: json_request,
                headers: new Headers({'content-type': 'application/json'}),
            });

        if (!response.ok) {
            await handleError(response);
            return;
        }

        await handleSuccess(response);
    } catch (error) {
        console.error(error);
        alert("Failed to get response from the server");
    }
}

async function handleSuccess(response) {
    try {
        const data = await response.json();
        console.log(data)

        insertIntoTable(
            data["x"],
            data["y"],
            data["r"],
            data["isInArea"],
            data["executionTimeNS"]
        );
    } catch (error) {
        console.error(error);
        alert(`Server code: ${response.status}, error: ${error.message}`);
    }
}

async function handleError(response) {
    try {
        const data = await response.json();
        const value = data["value"];
        const message = data["message"];

        switch (value) {
            case "x":
                x_input_error.textContent = message;
                break;

            case "y":
                y_input_error.textContent = message;
                break;

            default:
                throw new Error(message);
        }
    } catch (error) {
        console.error(error);
        alert(`Server code: ${response.status}, error: ${error.message}`);
    }
}
