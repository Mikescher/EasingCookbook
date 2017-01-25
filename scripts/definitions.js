var LANGUAGES = ["cs", "js", "es7"];

var HIGHLIGHT_CLASSES = {'cs':'lang-csharp', 'js':'lang-javascript', 'es7':'lang-javascript' };

const RESOLUTION = 1000;
const FPS = 30;
const ANIMATION_TIME     = 1500; // ms
const ANIMATION_COOLDOWN = 1000; // ms

///
///  SOURCES
/// =========
///
/// * [bezier-easing](https://gist.github.com/gre/1650294)
/// * [Robert Penner's easing equations](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js)
///

var FUNCTIONS =
[
    {
        "Name": "Custom",
        "Source": "#",
        "Parameters": [],
        "Editable": true,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "return 0.5; // edit me",
        "f_es7": "UNDEFINIED",
        "f_cs":  "UNDEFINIED",
    },
    {
        "Name": "FunctionJump",
        "Source": null,
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t < 0.5) ? 0 : 1",
        "f_es7": "(t < 0.5) ? 0 : 1",
        "f_cs":  "(t < 0.5) ? 0 : 1",
    },
    {
        "Name": "FunctionEaseLinear",
        "Source": null,
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t",
        "f_es7": "t",
        "f_cs":  "t",
    },
    {
        "Name": "FunctionEaseInQuad",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t*t",
        "f_es7": "t*t",
        "f_cs":  "t*t",
    },
    {
        "Name": "FunctionEaseInOutQuad",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
        "f_es7": "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
        "f_cs":  "(t<0.5)?(2*t*t):((4-2*t)*t-1)",
    },
    {
        "Name": "FunctionEaseInCubic",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t*t*t",
        "f_es7": "t**3",
        "f_cs":  "t*t*t",
    },
    {
        "Name": "FunctionEaseOutCubic",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t-1)*(t-1)*(t-1)+1",
        "f_es7": "1 + (t-1)**3",
        "f_cs":  "(t-1)*(t-1)*(t-1)+1",
    },
    {
        "Name": "FunctionEaseInOutCubic",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t<0.5)?(4*t*t*t):((t-1)*(2*t-2)*(2*t-2)+1)",
        "f_es7": "(t<0.5)?(4*t**3):((t-1)*(2*t-2)**2+1)",
        "f_cs":  "(t<0.5)?(4*t*t*t):((t-1)*(2*t-2)*(2*t-2)+1)",
    },
    {
        "Name": "FunctionEaseInQuart",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t*t*t*t",
        "f_es7": "t**4",
        "f_cs":  "t*t*t*t",
    },
    {
        "Name": "FunctionEaseOutQuart",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "1-(t-1)*(t-1)*(t-1)*(t-1)",
        "f_es7": "1 - (t-1)**4",
        "f_cs":  "1-(t-1)*(t-1)*(t-1)*(t-1)",
    },
    {
        "Name": "FunctionEaseInOutQuart",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t<0.5)?(8*t*t*t*t):(1-8*(t-1)*(t-1)*(t-1)*(t-1))",
        "f_es7": "(t<0.5)?(8 * t**4):(1-8 * (t-1)**4)",
        "f_cs":  "(t<0.5)?(8*t*t*t*t):(1-8*(t-1)*(t-1)*(t-1)*(t-1))",
    },
    {
        "Name": "FunctionEaseInQuint",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "min": 0,
        "max": 1,
        "f_js":  "t*t*t*t*t",
        "f_es7": "t**5",
        "f_cs":  "t*t*t*t*t",
    },
    {
        "Name": "FunctionEaseOutQuint",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "1+(t-1)*(t-1)*(t-1)*(t-1)*(t-1)",
        "f_es7": "1 + (t-1)**5",
        "f_cs":  "1+(t-1)*(t-1)*(t-1)*(t-1)*(t-1)",
    },
    {
        "Name": "FunctionEaseInOutQuint",
        "Source": "https://gist.github.com/gre/1650294",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t<0.5)?(16*t*t*t*t*t):(1+16*(t-1)*(t-1)*(t-1)*(t-1)*(t-1))",
        "f_es7": "(t<0.5)?(16 * t**5):(1+16 * (t-1)**5)",
        "f_cs":  "(t<0.5)?(16*t*t*t*t*t):(1+16*(t-1)*(t-1)*(t-1)*(t-1)*(t-1))",
    },
    {
        "Name": "FunctionEaseOutElastic",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float power", "0.3f"], ["float bounces", "2"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "let sbfm = 0.175 * bounces + 0.0875 - power/4;\nlet sbm = Math.sin(2 * sbfm * Math.PI/power);\nlet max = sbm * Math.pow(2, -10 * (0.175 * bounces + 0.0875)) + 1;\nt *= 0.175 * bounces + 0.0875;\nlet sb = Math.sin((t - power / 4) * (2*Math.PI)/power);\nreturn (sb * Math.pow(2, -10 * t) + 1)/max;",
        "f_es7": "let sbfm = 0.175 * bounces + 0.0875 - power/4;\nlet sbm = Math.sin(2 * sbfm * Math.PI/power);\nlet max = sbm * Math.pow(2, -10 * (0.175 * bounces + 0.0875)) + 1;\nt *= 0.175 * bounces + 0.0875;\nlet sb = Math.sin((t - power / 4) * (2*Math.PI)/power);\nreturn (sb * Math.pow(2, -10 * t) + 1)/max;",
        "f_cs":  "var sbfm = 0.175f * bounces + 0.0875f - power/4;\nvar sbm = Math.Sin(2 * sbfm * Math.PI/power);\nvar max = sbm * Math.Pow(2, -10*(0.175f*bounces+0.0875f)) + 1;\nt *= 0.175f * bounces + 0.0875;\nvar sb = Math.Sin((t - power / 4) * (2*Math.PI)/power);\nreturn (sb * Math.Pow(2, -10 * t) + 1)/max;",
    },
    {
        "Name": "FunctionEaseInSine",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "Math.sin(t * Math.PI/2)",
        "f_es7": "Math.sin(t * Math.PI/2)",
        "f_cs":  "Math.Sin(t * Math.PI/2)",
    },
    {
        "Name": "FunctionEaseOutSine",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "1 + Math.sin((t-1) * Math.PI/2)",
        "f_es7": "1 + Math.sin((t-1) * Math.PI/2)",
        "f_cs":  "1 + Math.sin((t-1) * Math.PI/2)",
    },
    {
        "Name": "FunctionEaseInOutSine",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(1 - Math.cos(Math.PI*t))/2",
        "f_es7": "(1 - Math.cos(Math.PI*t))/2",
        "f_cs":  "(1 - Math.cos(Math.PI*t))/2",
    },
    {
        "Name": "FunctionEaseInExpo",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "10f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "let s=Math.pow(2,-p);\nreturn (Math.pow(2, p*(t-1))-s) / (1-s)",
        "f_es7": "let s=Math.pow(2,-p);\nreturn (Math.pow(2, p*(t-1))-s) / (1-s)",
        "f_cs":  "var s=Math.Pow(2,-p);\nreturn (Math.Pow(2, p*(t-1))-s) / (1-s)",
    },
    {
        "Name": "FunctionEaseOutExpo",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "10"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(1-Math.pow(2, -p*t)) / (1-Math.pow(2, -p))",
        "f_es7": "(1-Math.pow(2, -p*t)) / (1-Math.pow(2, -p))",
        "f_cs":  "(1-Math.pow(2, -p*t)) / (1-Math.pow(2, -p))",
    },
    {
        "Name": "FunctionEaseInOutExpo",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "10"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "let s = Math.pow(2, -2*p) / 2;\nlet e = 1 - Math.pow(2, -p)/2;\nif (t<0.5) return (Math.pow(2, p*(2*t-1)) / 2 - s) / (e-s);\nreturn (1 - Math.pow(2, -p*(2*t-1))/2 - s) / (e-s);",
        "f_es7": "let s = Math.pow(2, -2*p) / 2;\nlet e = 1 - Math.pow(2, -p)/2;\nif (t<0.5) return (Math.pow(2, p*(2*t-1)) / 2 - s) / (e-s);\nreturn (1 - Math.pow(2, -p*(2*t-1))/2 - s) / (e-s);",
        "f_cs":  "var s = Math.Pow(2, -2*p) / 2;\nvar e = 1 - Math.Pow(2, -p)/2;\nif (t<0.5) return (Math.Pow(2, p*(2*t-1)) / 2 - s) / (e-s);\nreturn (1 - Math.Pow(2, -p*(2*t-1))/2 - s) / (e-s);",
    },
    {
        "Name": "FunctionEaseInCirc",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "1 - Math.sqrt(1 - t*t)",
        "f_es7": "1 - Math.sqrt(1 - t*t)",
        "f_cs":  "1 - Math.Sqrt(1 - t*t)",
    },
    {
        "Name": "FunctionEaseInCirc",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "Math.sqrt(1 - (t-1)*(t-1))",
        "f_es7": "Math.sqrt(1 - (t-1)**2)",
        "f_cs":  "Math.Sqrt(1 - (t-1)*(t-1))",
    },
    {
        "Name": "FunctionEaseInOutCirc",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "if (t<0.5) return (1 - Math.sqrt(1 - 4*t*t))/2;\nreturn (Math.sqrt(1 - (2*t-2)*(2*t-2)) + 1)/2;",
        "f_es7": "if (t<0.5) return (1 - Math.sqrt(1 - 4*t*t))/2;\nreturn (Math.sqrt(1 - (2*t-2)**2) + 1)/2;",
        "f_cs":  "if (t<0.5) return (1 - Math.Sqrt(1 - 4*t*t))/2;\nreturn (Math.Sqrt(1 - (2*t-2)*(2*t-2)) + 1)/2;",
    },
    {
        "Name": "FunctionEaseInElastic",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "0.3f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "-Math.pow(2,10*(t-1)) * Math.sin((t-1-p/4) * (2*Math.PI)/p)",
        "f_es7": "-Math.pow(2,10*(t-1)) * Math.sin((t-1-p/4) * (2*Math.PI)/p)",
        "f_cs":  "-Math.Pow(2,10*(t-1))*Math.Sin((t-1-p/4f)*(2*Math.PI)/p)",
    },
    {
        "Name": "FunctionEaseOutElastic",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "0.3f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "Math.pow(2,-10*t) * Math.sin(2*(t - p/4) * Math.PI/p)+1",
        "f_es7": "Math.pow(2,-10*t) * Math.sin(2*(t - p/4) * Math.PI/p)+1",
        "f_cs":  "Math.Pow(2,-10*t) * Math.Sin(2*(t - p/4f) * Math.PI/p)+1",
    },
    {
        "Name": "FunctionEaseInOutElastic",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float p", "0.45f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "let s = Math.sin(2*(2*t-1-p/4)*Math.PI/p)/2;\nreturn s*Math.pow(2,(t<.5?10:-10)*(2*t-1))*(t<.5?-1:1)+(t<.5?0:1);",
        "f_es7": "let s = Math.sin(2*(2*t-1-p/4)*Math.PI/p)/2;\nreturn s*Math.pow(2,(t<.5?10:-10)*(2*t-1))*(t<.5?-1:1)+(t<.5?0:1);",
        "f_cs":  "var s = Math.Sin(2*(2*t-1-p/4f)*Math.PI/p)/2;\nif (t<0.5f)\n    return -s*Math.Pow(2,10*(2*t-1));\nelse\n    return s*Math.Pow(2,-10*(2*t-1)) + 1;",
    },
    {
        "Name": "FunctionEaseInBack",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float s", "1.70158f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t*t*((s+1)*t - s)",
        "f_es7": "t*t*((s+1)*t - s)",
        "f_cs":  "t*t*((s+1)*t - s)",
    },
    {
        "Name": "FunctionEaseOutBack",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float s", "1.70158f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "(t-1)*(t-1)*((s+1)*(t-1)+s) + 1",
        "f_es7": "(t-1)*(t-1)*((s+1)*(t-1)+s) + 1",
        "f_cs":  "(t-1)*(t-1)*((s+1)*(t-1)+s) + 1",
    },
    {
        "Name": "FunctionEaseInOutBack",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [["float s", "2.59491f"]],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "if (t<.5) return (4*t*t*((s+1)*t*2-s))/2;\nelse return ((2*t-2)*(2*t-2)*((s+1)*(2*t-2)+s)+2)/2;",
        "f_es7": "if (t<.5) return (4*t*t*((s+1)*t*2-s))/2;\nelse return ((2*t-2)**2*((s+1)*(2*t-2)+s)+2)/2;",
        "f_cs":  "if (t<0.5f)\n    return (4*t*t*((s+1)*t*2-s))/2;\nelse\n    return ((2*t-2)*(2*t-2)*((s+1)*(2*t-2)+s)+2)/2;",
    },
    {
        "Name": "FunctionEaseInBounce",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "t=1-t;\nif (t < (1/2.75))\n    return 1 - (7.5625*t*t);\nelse if (t < (2/2.75))\n    return 1 - (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + .75);\nelse if (t < (2.5/2.75))\n    return 1 - (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + .9375);\nelse\n    return 1 - (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + .984375);",
        "f_es7": "t=1-t;\nif (t < (1/2.75))\n    return 1 - (7.5625*t*t);\nelse if (t < (2/2.75))\n    return 1 - (7.5625*(t-(1.5/2.75))**2 + .75);\nelse if (t < (2.5/2.75))\n    return 1 - (7.5625*(t-(2.25/2.75))**2 + .9375);\nelse\n    return 1 - (7.5625*(t-(2.625/2.75))**2 + .984375);",
        "f_cs":  "t=1-t;\nif (t < (1/2.75))\n    return 1 - (7.5625*t*t);\nelse if (t < (2/2.75))\n    return 1 - (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + 0.75);\nelse if (t < (2.5/2.75))\n    return 1 - (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + 0.9375);\nelse\n    return 1 - (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + 0.984375);",
    },
    {
        "Name": "FunctionEaseOutBounce",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "if (t < (1/2.75))\n    return (7.5625*t*t);\nelse if (t < (2/2.75))\n    return (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + .75);\nelse if (t < (2.5/2.75))\n    return (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + .9375);\nelse\n    return (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + .984375);",
        "f_es7": "if (t < (1/2.75))\n    return (7.5625*t*t);\nelse if (t < (2/2.75))\n    return (7.5625*(t-(1.5/2.75))**2 + .75);\nelse if (t < (2.5/2.75))\n    return (7.5625*(t-(2.25/2.75))**2 + .9375);\nelse\n    return (7.5625*(t-(2.625/2.75))**2 + .984375);",
        "f_cs":  "if (t < (1/2.75))\n    return (7.5625*t*t);\nelse if (t < (2/2.75))\n    return (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + 0.75);\nelse if (t < (2.5/2.75))\n    return (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + 0.9375);\nelse\n    return (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + 0.984375);",
    },
    {
        "Name": "FunctionEaseInOutBounce",
        "Source": "http://robertpenner.com/easing/",
        "Parameters": [],
        "Editable": false,
        "blob": null,
        "min": 0,
        "max": 1,
        "f_js":  "if (t<0.5) {\n    t=1-2*t;\n    if (t < (1/2.75))\n        return (1 - (7.5625*t*t))/2;\n    else if (t < (2/2.75))\n        return (1 - (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + .75))/2;\n    else if (t < (2.5/2.75))\n        return (1 - (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + .9375))/2;\n    else\n        return (1 - (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + .984375))/2;\n} else {\n    t=2*t-1;\n    if (t < (1/2.75))\n        return .5 + (7.5625*t*t)/2;\n    else if (t < (2/2.75))\n        return .5 + (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + .75)/2;\n    else if (t < (2.5/2.75))\n        return .5 + (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + .9375)/2;\n    else\n        return .5 + (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + .984375)/2;\n}",
        "f_es7": "if (t<0.5) {\n    t=1-2*t;\n    if (t < (1/2.75))\n        return (1 - (7.5625*t*t))/2;\n    else if (t < (2/2.75))\n        return (1 - (7.5625*(t-(1.5/2.75))**2 + .75))/2;\n    else if (t < (2.5/2.75))\n        return (1 - (7.5625*(t-(2.25/2.75))**2 + .9375))/2;\n    else\n        return (1 - (7.5625*(t-(2.625/2.75))**2 + .984375))/2;\n} else {\n    t=2*t-1;\n    if (t < (1/2.75))\n        return .5 + (7.5625*t*t)/2;\n    else if (t < (2/2.75))\n        return .5 + (7.5625*(t-(1.5/2.75))**2 + .75)/2;\n    else if (t < (2.5/2.75))\n        return .5 + (7.5625*(t-(2.25/2.75))**2 + .9375)/2;\n    else\n        return .5 + (7.5625*(t-(2.625/2.75))**2 + .984375)/2;\n}",
        "f_cs":  "if (t<0.5) {\n    t=1-2*t;\n    if (t < (1/2.75))\n        return (1 - (7.5625*t*t))/2;\n    else if (t < (2/2.75))\n        return (1 - (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + 0.75))/2;\n    else if (t < (2.5/2.75))\n        return (1 - (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + 0.9375))/2;\n    else\n        return (1 - (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + 0.984375))/2;\n} else {\n    t=2*t-1;\n    if (t < (1/2.75))\n        return 0.5 + (7.5625*t*t)/2;\n    else if (t < (2/2.75))\n        return 0.5 + (7.5625*(t-(1.5/2.75))*(t-(1.5/2.75)) + 0.75)/2;\n    else if (t < (2.5/2.75))\n        return 0.5 + (7.5625*(t-(2.25/2.75))*(t-(2.25/2.75)) + 0.9375)/2;\n    else\n        return 0.5 + (7.5625*(t-(2.625/2.75))*(t-(2.625/2.75)) + 0.984375)/2;\n}",
    },
    //next: easeInBounce
];