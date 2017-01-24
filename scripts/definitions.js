var LANGUAGES = ["cs", "js", "es7"]

var HIGHLIGHT_CLASSES = {'cs':'lang-csharp', 'js':'lang-javascript', 'es7':'lang-javascript', }

var FUNCTIONS =
[
    {
        "Name": "FunctionJump",
        "Parameters": [],
        "f_js": "(t < 0.5) ? 0 : 1",
        "f_es7": "(t < 0.5) ? 0 : 1",
        "f_cs": "(t < 0.5) ? 0 : 1",
    },
    {
        "Name": "FunctionEaseLinear",
        "Parameters": [],
        "f_js":  "t",
        "f_es7": "t",
        "f_cs":  "t",
    },
    {
        "Name": "FunctionEaseInQuad",
        "Parameters": [],
        "f_js":  "t*t",
        "f_es7": "t**2",
        "f_cs":  "t*t",
    },
    {
        "Name": "FunctionEaseInOutQuad",
        "Parameters": [],
        "f_js":  "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
        "f_es7": "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
        "f_cs":  "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
    },
    {
        "Name": "FunctionEaseInCubic",
        "Parameters": [],
        "f_js":  "t*t*t",
        "f_es7": "t**3",
        "f_cs":  "t*t*t",
    },
    {
        "Name": "FunctionEaseOutCubic",
        "Parameters": [],
        "f_js":  "(t-1)*(t-1)*(t-1)+1",
        "f_es7": "1 + (t-1)**3",
        "f_cs":  "(t-1)*(t-1)*(t-1)+1",
    },
    {
        "Name": "FunctionEaseInOutCubic",
        "Parameters": [],
        "f_js":  "(t<0.5)?(4*t*t*t):((t-1)*(2*t-2)*(2*t-2)+1)",
        "f_es7": "(t<0.5)?(4*t**3):((t-1)*(2*t-2)**2+1)",
        "f_cs":  "(t<0.5)?(4*t*t*t):((t-1)*(2*t-2)*(2*t-2)+1)",
    },
    {
        "Name": "FunctionEaseInQuart",
        "Parameters": [],
        "f_js":  "t*t*t*t",
        "f_es7": "t**4",
        "f_cs":  "t*t*t*t",
    },
    {
        "Name": "FunctionEaseOutQuart",
        "Parameters": [],
        "f_js":  "1-(t-1)*(t-1)*(t-1)*(t-1)",
        "f_es7": "1 - (t-1)**4",
        "f_cs":  "1-(t-1)*(t-1)*(t-1)*(t-1)",
    },
    {
        "Name": "FunctionEaseInOutQuart",
        "Parameters": [],
        "f_js":  "(t<0.5)?(8*t*t*t*t):(1-8*(t-1)*(t-1)*(t-1)*(t-1))",
        "f_es7": "(t<0.5)?(8 * t**4):(1-8 * (t-1)**4)",
        "f_cs":  "(t<0.5)?(8*t*t*t*t):(1-8*(t-1)*(t-1)*(t-1)*(t-1))",
    },
    {
        "Name": "FunctionEaseInQuint",
        "Parameters": [],
        "f_js":  "t*t*t*t*t",
        "f_es7": "t**5",
        "f_cs":  "t*t*t*t*t",
    },
    {
        "Name": "FunctionEaseOutQuint",
        "Parameters": [],
        "f_js":  "1+(t-1)*(t-1)*(t-1)*(t-1)*(t-1)",
        "f_es7": "1 + (t-1)**5",
        "f_cs":  "1+(t-1)*(t-1)*(t-1)*(t-1)*(t-1)",
    },
    {
        "Name": "FunctionEaseInOutQuint",
        "Parameters": [],
        "f_js":  "(t<0.5)?(16*t*t*t*t*t):(1+16*(t-1)*(t-1)*(t-1)*(t-1)*(t-1))",
        "f_cs":  "(t<0.5)?(16*t*t*t*t*t):(1+16*(t-1)*(t-1)*(t-1)*(t-1)*(t-1))",
        "f_es7": "(t<0.5)?(16 * t**5):(1+16 * (t-1)**5)",
    },
    {
        "Name": "FunctionEaseOutElastic",
        "Parameters": [["float power", "0.3f"], ["float bounces", "2"]],
        "f_js":  "t *= 0.175 * bounces + 0.0875;\nlet sb = Math.sin((t - power / 4) * (2*Math.PI)/power);\nreturn sb * Math.pow(2, -10 * t) + 1;",
        "f_es7": "t *= 0.175 * bounces + 0.0875;\nlet sb = Math.sin((t - power / 4) * (2*Math.PI)/power);\nreturn sb * Math.pow(2, -10 * t) + 1;",
        "f_cs":  "t *= 0.175f * bounces + 0.0875f;\nvar sb = Math.Sin((t - power / 4) * (2*Math.PI)/power);\nreturn sb * Math.Pow(2, -10 * t) + 1;",
    },
];