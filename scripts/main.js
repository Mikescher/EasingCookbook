
Chart.defaults.global.animation.duration = 0;

new Chart(document.getElementById("previewChart"), {
    type: 'line',
    data: {
        cubicInterpolationMode: 'monotone',
        datasets: createDataSet("t < .5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1)")
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