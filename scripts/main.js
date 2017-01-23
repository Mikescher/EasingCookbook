
Chart.defaults.global.animation.duration = 0;

let mainChart = new Chart(document.getElementById("previewChart"), {
    type: 'line',
    data: {
        cubicInterpolationMode: 'monotone',
        datasets: createDataSet(FUNCTIONS[0])
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

FUNCTIONS.forEach(appendFunction);

function createDataSet(obj) {
    const RESOLUTION = 1000;

    let compiled = eval('(function (t){return ' + obj.f_js + ';})')

    let data = [];

    for (let i=0; i < RESOLUTION; i++) {
        data.push({x: i/RESOLUTION, y: compiled(i/RESOLUTION)});
    }

    return [{
        label: obj.f_es7,
        data: data,
        fill: false,
        borderColor: 'rgba(0, 0, 0, 0.75)',
        pointRadius: 0,
        borderWidth: 4,
    }];
}

function appendFunction(obj)
{
    let code = document.createElement("code");
    code.className = "csharp hljs";

    code.innerHTML = createCode(obj, "cs");

    let pre = document.createElement("pre");
    pre.appendChild(code);

    let inner = document.createElement("div");
    inner.className = "code";
    inner.appendChild(pre);

    code.style.cursor = 'pointer';
    code.onclick = function()
    {
        mainChart.data.datasets = createDataSet(obj);
        mainChart.update();
    };

    let container = document.createElement("div");
    container.className = "codeContainer";
    container.appendChild(inner);

    document.getElementById("functionContainer").appendChild(container);
}

function createCode(obj, lang)
{
    if (lang == "cs")
    {
        let compact = "float "+obj.Name+"("+createParamList(obj, lang)+") => "+obj.f_cs+";";

        if (compact.length <= 70 && !compact.includes('\n') && !compact.includes('return')) return compact;

        return "float "+obj.Name+"("+createParamList(obj, lang)+")\n{\n"+indentFunc(obj.f_cs)+"\n}"
    }
    else if (lang == "js")
    {
        let compact = "function "+obj.Name+"("+createParamList(obj, lang)+") { return "+obj.f_js+"; }";

        if (compact.length <= 70 && !compact.includes('\n') && !compact.includes('return')) return compact;

        return "function "+obj.Name+"("+createParamList(obj, lang)+") {\n"+indentFunc(obj.f_js)+"\n}"
    }
    else
    {
        return "Undefinied"
    }
}

function indentFunc(str)
{
    if (!str.includes("return")) str = "return "+str+";";

    return str.split('\n').map(s => "    "+s).join("\n");
}

function createParamList(obj, lang)
{
    if (lang == "cs")
    {
        let r = ["float t"];
        let a = obj.Parameters.map(p => (p.length > 1) ? (p[0]+"=" + p[1]) :(p[0]));
        return [...r, ...a].join(", ")
    }
    else if (lang == "js")
    {
        let r = ["t"];
        let a = obj.Parameters.map(p => (p.length > 1) ? (p[0].split(' ')[1]+"=" + p[1]) :(p[0].split(' ')[1]));
        return [...r, ...a].join(", ")
    }
    else
    {
        return "Undefinied"
    }
}