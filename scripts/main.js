
Chart.defaults.global.animation.duration = 0;

let mainChart = new Chart(document.getElementById("previewChart"), {
    type: 'line',
    data: {
        cubicInterpolationMode: 'monotone',
        datasets: createDataSet("t < .5 ? 0 : 1")
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        },
        animation: {
            animation : false,
            animateScale: false,
            animateRotate: false,
        }
    }
});

appendFunction("FunctionEaseLinear", "t");
appendFunction("FunctionEaseInQuad", "t * t");
appendFunction("FunctionEaseInOutQuad", "t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t");
appendFunction("FunctionEaseInCubic", "t * t * t");
appendFunction("FunctionEaseOutCubic", "(t - 1) * (t - 1) * (t - 1) + 1");
appendFunction("FunctionEaseInOutCubic", "t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1");
appendFunction("FunctionEaseInQuart", "t * t * t * t");
appendFunction("FunctionEaseOutQuart", "1 - (t - 1) * (t - 1) * (t - 1) * (t - 1)");
appendFunction("FunctionEaseInOutQuart", "t < .5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1)");
appendFunction("FunctionEaseInQuint", "t * t * t * t * t");
appendFunction("FunctionEaseOutQuint", "1 + (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1)");
appendFunction("FunctionEaseInOutQuint", "t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1)");


function createDataSet(func) {
    const RESOLUTION = 1000;

    let compiled = eval('(function (t){return ' + func + ';})')

    let data = [];

    for (let i=0; i < RESOLUTION; i++) {
        data.push({x: i/RESOLUTION, y: compiled(i/RESOLUTION)});
    }

    return [{
        label: 'return '+func,
        data: data,
        fill: false,
        borderColor: 'rgba(0, 0, 0, 0.75)',
        pointRadius: 0,
        borderWidth: 4,
    }];
}

function appendFunction(name, func)
{
    let code = document.createElement("code");
    code.className = "csharp hljs";

    code.innerHTML = "float "+name+"(float t) => "+func+";";

    let pre = document.createElement("pre");
    pre.appendChild(code);

    let inner = document.createElement("div");
    inner.className = "code";
    inner.appendChild(pre);

    code.style.cursor = 'pointer';
    code.onclick = function()
    {
        mainChart.data.datasets = createDataSet(func);
        mainChart.update();
    };

    let container = document.createElement("div");
    container.className = "codeContainer";
    container.appendChild(inner);

    document.getElementById("body").appendChild(container);
}