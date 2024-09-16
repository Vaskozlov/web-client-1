import {stringToFloat} from "./string_to_float.js";
import {insertToTable} from "./table_updater.js"
import JXG from 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs';

const allowed_radios = ["1", "1.5", "2", "2.5", "3"];

const x_input_element = document.getElementById("x_input")
const y_input_element = document.getElementById("y_input")
const r_select_element = document.getElementById("r_input")

const board =
    JXG.JSXGraph.initBoard('box1', {
        boundingbox: [-8, 8, 8, -8],
        showCopyright: false,
        showNavigation: false,
        zoomX: 6,
        zoomY: 6,
        zoom: {
            wheel: false
        },
        axis: true,
        defaultAxes: {
            x: {
                name: 'x',
                withLabel: true,
                label: {
                    position: 'rt',
                    offset: [-15, 10]
                },
                ticks: {
                    insertTicks: false,
                    scaleSymbol: 'R',
                    minorHeight: 0,
                    ticksDistance: 0.5
                }
            },
            y: {
                name: 'y',
                withLabel: true,
                label: {
                    position: 'rt',
                    offset: [10, 0]
                },
                ticks: {
                    scaleSymbol: 'R',
                    minorHeight: 0,
                    insertTicks: false,
                    ticksDistance: 0.5
                }
            }
        }
    });

function drawAreas() {
    board.create(
        "polygon",
        [[0, 0], [1, 0], [0, 0.5]], {
            fillcolor: "lightblue",
            fillOpacity: 0.8,
            withLines: false,
            vertices: {
                visible: false
            }
        })

    board.create(
        "polygon",
        [[0, 0], [1, 0], [1, -0.5], [0, -0.5]], {
            fillcolor: "lightblue",
            fillOpacity: 0.8,
            withLines: false,
            vertices: {
                visible: false
            },
            radius: 0
        })

    board.create("sector",
        [[0, 0], [-0.5, 0], [0, -0.5]],
        {
            fillcolor: "lightblue",
            fillOpacity: 0.8,
            vertices: {
                visible: false
            },
            radiuspoint: {
                visible: false
            },
            anglePoint: {
                visible: false
            },
            strokeWidth: 0,
        })
}

window.onload = function () {
    drawAreas();
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

        const json_request = JSON.stringify(
            {x: x_value.getValue(), y: y_value.getValue(), r: r_value.getValue()});

        fetch("http://localhost:8080/fcgi-bin/hello-world.jar",
            {method: "POST", body: json_request})
            .then(response => {
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
        console.error(data);
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
