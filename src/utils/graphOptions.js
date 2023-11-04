const basicOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    responsive: true,
};
let blueChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#2380f7",
                },
            },
        ],

        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#2380f7",
                },
            },
        ],
    },
};

let lineChartOptionsBlue = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    responsive: true,
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],

        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],
    },
};

let barChartOptionsGradient = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    responsive: true,
    scales: {
        yAxes: [
            {
                gridLines: {
                    drawBorder: false,
                    color: "rgba(253,93,147,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 5,
                    suggestedMax: 10,
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],

        xAxes: [
            {
                gridLines: {
                    drawBorder: false,
                    color: "rgba(253,93,147,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],
    },
};

let pieChartOptions = {
    ...basicOptions,
    cutoutPercentage: 70,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },

    scales: {
        yAxes: [
            {
                display: 0,
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: "transparent",
                    color: "rgba(255,255,255,0.05)",
                },
            },
        ],

        xAxes: [
            {
                display: 0,
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(255,255,255,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    display: false,
                },
            },
        ],
    },
};

let purpleChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 10,
                    suggestedMax: 20,
                    padding: 20,
                    fontColor: "#9a9a9a",
                },
            },
        ],

        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(225,78,202,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a",
                },
            },
        ],
    },
};

let orangeChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 300,
                    padding: 20,
                    fontColor: "#ff8a76",
                },
            },
        ],

        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(220,53,69,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#ff8a76",
                },
            },
        ],
    },
};
let greenChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],

        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(0,242,195,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],
    },
};

let barChartOptions = {
    ...basicOptions,
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    scales: {
        yAxes: [
            {
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 10,
                    suggestedMax: 20,
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e",
                },
            },
        ],
    },
};
module.exports = {
    barChartOptions,
    barChartOptionsGradient,
    lineChartOptionsBlue,
    pieChartOptions,
    purpleChartOptions,
    orangeChartOptions,
    greenChartOptions,
    blueChartOptions

}