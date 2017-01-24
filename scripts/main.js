
//=================================================================================================

let functionNodeCache = [];
let currentLanguage = "cs";
let selectedFuncObj = null;
let animationStartTicks = new Date().getTime();

let elem_bobAnim  = document.getElementById("PATBobbleAnimation");
let elem_bobStart = document.getElementById("PATBobbleStart");
let elem_bobEnd   = document.getElementById("PATBobbleEnd");
let elem_container = document.getElementById("previewAnimationTranslate");

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

window.setInterval(animate, 1000/FPS);

selectFuncObject(FUNCTIONS[1], true);

//=================================================================================================


function createDataSet(obj, params) 
{
    let data = [];

    if (obj.blob === null)
    {
        let fnc = '('+createCode(obj, "js")+')';
        try {
            let compiled = eval(fnc);
            obj.blob = function(t) { return compiled.apply(null, [t, ...params]) };
        } catch  (e) {
            console.log(e);
            console.log(fnc);
            obj.blob = function(t) { return t; }
        }

    }

    let min = 0;
    let max = 1;
    for (let i=0; i < RESOLUTION; i++) {
        let xx = i/RESOLUTION;
        let yy = obj.blob(xx);
        data.push({x: xx, y: yy});
        min = Math.min(min, yy);
        max = Math.max(max, yy);
    }
    obj.min = min;
    obj.max = max;

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

    for(let param of obj.Parameters) {

        let lbl = document.createElement("span");
        lbl.className = 'input-group-addon';
        lbl.innerHTML = param[0].split(' ')[1];

        let box = document.createElement("input");
        box.setAttribute('type', 'text');
        box.className = "form-control";
        if (param[1] != "") box.setAttribute('value', cleanDefaultValue(param[1]));
        box.innerHTML = param[0].split(' ')[1];

        let subcontainer = document.createElement("div");
        subcontainer.className = "additional_param";

        let inputgroup = document.createElement("div");
        inputgroup.className = "input-group";

        inputgroup.appendChild(lbl);
        inputgroup.appendChild(box);

        if (param[1] != "" && cleanDefaultValue(param[1]) != param[1]) {
            let suffix = document.createElement("span");
            suffix.className = 'input-group-addon';
            suffix.innerHTML = param[1].slice(-1);
            inputgroup.appendChild(suffix);
        }
        
        subcontainer.appendChild(inputgroup);

        paramNodes.push(box);

        box.oninput = () => selectFuncObject(obj, true);

        container.appendChild(subcontainer);
    }

    let editArea = null;

    if (obj.Editable) {
        let editContainer = document.createElement("div");
        editContainer.className = "common-hidden";
        editContainer.id="edit-container";

        let editArea = document.createElement("textarea");
        editArea.className="edit-textarea";
        editArea.value = '????';

        editContainer.appendChild(editArea);
        container.appendChild(editContainer);
        
        let btn = document.createElement("a");
        btn.className="btn btn-default common-visible";
        btn.id="function-edit-button";
        btn.href='#';
        btn.onclick = () => { return false; };
        
        let icon = document.createElement("i");
        icon.className='icon-pencil';
        
        let editTextNode = document.createTextNode('Edit');

        btn.appendChild(icon);
        btn.appendChild(editTextNode);
        
        let expanded = false;
        btn.onclick = function() {
            if (expanded) {
                editTextNode.nodeValue = "Edit";

                editContainer.classList.add('common-hidden');
                editContainer.classList.remove('common-visible');
                
                inner.classList.add('common-visible');
                inner.classList.remove('common-hidden');

                obj.f_js = editArea.value;

                updateNode(obj, code, "js");
                
                expanded = false;

                selectFuncObject(obj, true);

                return false;
            } else {
                editTextNode.nodeValue = "OK";
                
                editArea.value = obj.f_js;
                editContainer.height = container.offsetHeight;
                editContainer.width = container.offsetWidth;

                editContainer.classList.remove('common-hidden');
                editContainer.classList.add('common-visible');
                
                inner.classList.remove('common-visible');
                inner.classList.add('common-hidden');
                
                expanded = true;

                return false;
            }
        };

        container.appendChild(btn);

    }

    code.onclick = () => selectFuncObject(obj, false);

    functionNodeCache.push({'Object': obj, 'Container': container, 'ParameterNodes': paramNodes, 'CodeNode': code, 'EditNode': editArea});

    document.getElementById("functionContainer").appendChild(container);
}

function selectFuncObject(obj, forceRecalc)
{
    selectedFuncObj = functionNodeCache.find(o => o.Object.Name == obj.Name);

    if (forceRecalc) selectedFuncObj.blob = null;

    functionNodeCache.forEach(n => n.Container.classList.remove("selected_func"));
    mainChart.data.datasets = createDataSet(obj, selectedFuncObj.ParameterNodes.map(n => n.value));
    mainChart.update();
    selectedFuncObj.Container.classList.add("selected_func");

    animationStartTicks = new Date().getTime();

    let mp0 = (0 - selectedFuncObj.Object.min) / (selectedFuncObj.Object.max - selectedFuncObj.Object.min);
    let mp1 = (1 - selectedFuncObj.Object.min) / (selectedFuncObj.Object.max - selectedFuncObj.Object.min);
    elem_bobStart.style.left = (5 + (elem_container.offsetWidth - elem_bobAnim.offsetWidth - 10) * mp0) + "px";
    elem_bobEnd.style.left = (5 + (elem_container.offsetWidth - elem_bobAnim.offsetWidth - 10) * mp1) + "px";
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

function updateNode(obj, codenode, lang) 
{
    codenode.className = '';
    codenode.innerHTML = createCode(obj, lang);
    codenode.className = HIGHLIGHT_CLASSES[obj.Editable ? "js" : lang] + ' hljs';
    hljs.highlightBlock(codenode);
}

function animate() 
{
    if(selectedFuncObj === null) return;
    if(selectedFuncObj.Object === null) return;
    if(selectedFuncObj.Object.blob === null) return;

    let now = new Date().getTime();
    let time = ((now - animationStartTicks) % (ANIMATION_TIME + 2*ANIMATION_COOLDOWN));

    let progress = (time - ANIMATION_COOLDOWN) / ANIMATION_TIME;

    if (time <= ANIMATION_COOLDOWN) progress = 0; // cooldown;
    if (progress > 1) progress = 1;               // cooldown;

    let mp = (selectedFuncObj.Object.blob(progress) - selectedFuncObj.Object.min) / (selectedFuncObj.Object.max - selectedFuncObj.Object.min);

    elem_bobAnim.style.left = (5 + (elem_container.offsetWidth - elem_bobAnim.offsetWidth - 10) * mp) + "px";
}