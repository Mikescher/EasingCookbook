
var functionNodeCache = [];
var currentLanguage = "cs";

Chart.defaults.global.animation.duration = 0;

let mainChart = new Chart(document.getElementById("previewChart"), 
{
    type: 'line',
    data: { cubicInterpolationMode: 'monotone', datasets: createDataSet(FUNCTIONS[0], []) },
    options: 
    { 
        scales: { xAxes: [{ type: 'linear', position: 'bottom' }] },
        animation: { animation : false, animateScale: false, animateRotate: false },
    }
});

FUNCTIONS.forEach(appendFunction);

setLang(currentLanguage);


//=================================================================================================


function createDataSet(obj, params) 
{
    const RESOLUTION = 1000;

    let data = [];

    let fnc = '('+createCode(obj, "js")+')';
    try {
        let compiled = eval(fnc);
        
        
        for (let i=0; i < RESOLUTION; i++) {
            data.push({x: i/RESOLUTION, y: compiled.apply(this, [i/RESOLUTION, ...params])});
        }
    } catch  (e) {
        console.log(e);
        console.log(fnc);
        data.push({x: 0, y: 0.5});
        data.push({x: 1, y: 0.5});
    }

    return [{
        label: obj.Name,
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

    let pre = document.createElement("pre");
    pre.appendChild(code);

    let inner = document.createElement("div");
    inner.className = "code";
    inner.appendChild(pre);

    code.style.cursor = 'pointer';

    let container = document.createElement("div");
    container.className = "codeContainer";
    container.appendChild(inner);

    let paramNodes = [];

    let updateFunc = function()
    {
        functionNodeCache.forEach(n => n.Container.classList.remove("selected_func"))
        mainChart.data.datasets = createDataSet(obj, paramNodes.map(n => n.value));
        mainChart.update();
        container.classList.add("selected_func");
    };

    for(let param of obj.Parameters) {

        let lbl = document.createElement("span");
        lbl.className = 'input-group-addon';
        lbl.innerHTML = param[0].split(' ')[1];

        let box = document.createElement("input");
        box.setAttribute('type', 'text')
        box.className = "form-control";
        if (param[1] != "") box.setAttribute('value', cleanDefaultValue(param[1]))
        box.innerHTML = param[0].split(' ')[1];

        let subcontainer = document.createElement("div");
        subcontainer.className = "additional_param";

        let inputgroup = document.createElement("div");
        inputgroup.className = "input-group";

        inputgroup.appendChild(lbl);
        inputgroup.appendChild(box);

        if (param[1] != "" && cleanDefaultValue(param[1]) != param[1]) {
            let suffix = document.createElement("span")
            suffix.className = 'input-group-addon';
            suffix.innerHTML = param[1].slice(-1);
            inputgroup.appendChild(suffix);
        }
        
        subcontainer.appendChild(inputgroup);

        paramNodes.push(box);

        box.oninput = updateFunc;

        container.appendChild(subcontainer);
    }

    let editArea;

    if (obj.Editable) {
        let editArea = document.createElement("textarea");
        editArea.className="edit-textarea form-control common-hidden";
        editArea.value = '????';
        
        container.appendChild(editArea);
        
        let btn = document.createElement("a");
        btn.className="btn btn-default function-edit-button common-visible";
        btn.href='#';
        btn.onclick = () => { return false; };
        
        let icon = document.createElement("i");
        icon.className='icon-pencil'
        
        let editTextNode = document.createTextNode('Edit');

        btn.appendChild(icon);
        btn.appendChild(editTextNode)
        
        let expanded = false;
        btn.onclick = function() {
            if (expanded) {
                editTextNode.nodeValue = "Edit";

                editArea.classList.add('common-hidden');
                editArea.classList.remove('common-visible');
                
                inner.classList.add('common-visible');
                inner.classList.remove('common-hidden');

                obj.f_js = editArea.value;

                updateNode(obj, code, "js");
                
                expanded = false;

                updateFunc();

                return false;

            } else {
                editTextNode.nodeValue = "OK";
                
                editArea.value = obj.f_js;
                editArea.height = code.height;
                editArea.width = code.width;
                
                editArea.classList.remove('common-hidden');
                editArea.classList.add('common-visible');
                
                inner.classList.remove('common-visible');
                inner.classList.add('common-hidden');
                
                expanded = true;

                return false;
            }
        }

        container.appendChild(btn);

    }

    code.onclick = updateFunc;

    functionNodeCache.push({'Object': obj, 'Container': container, 'ParameterNodes:': paramNodes, 'CodeNode': code, 'EditNode': editArea});

    document.getElementById("functionContainer").appendChild(container);
}

function cleanDefaultValue(v) 
{
    while (v.length > 1 && (v.endsWith('f') || v.endsWith('i') || v.endsWith('d'))) v = v.slice(0, -1);
    return v;
}

function createCode(obj, lang)
{
    if (obj.Editable) lang = "js";

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
    else if (lang == "es7")
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
        let a = obj.Parameters.map(p => p[0].split(' ')[1]);
        return [...r, ...a].join(", ")
    }
    else if (lang == "es7")
    {
        let r = ["t"];
        let a = obj.Parameters.map(p => p[0].split(' ')[1]);
        return [...r, ...a].join(", ")
    }
    else
    {
        return "Undefinied"
    }
}

function setLang(l) 
{
    currentLanguage = l;
    let tabbar = document.getElementById("tabbar");
    for (let child of tabbar.children) {
        if (child.id.endsWith(l)) 
            child.classList.add("active");
        else
            child.classList.remove("active");
    }

    functionNodeCache.forEach(f => updateNode(f.Object, f.CodeNode, l));
}

function updateNode(obj, codenode, lang) {
    codenode.className = '';
    codenode.innerHTML = createCode(obj, lang);
    codenode.className = HIGHLIGHT_CLASSES[obj.Editable ? "js" : lang] + ' hljs';
    hljs.highlightBlock(codenode);
}