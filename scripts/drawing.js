///<reference path="../node_modules/d3/build/d3.js" />

class Map {
    constructor(width, height, margin, chart) {
        this.width = width - margin.left - margin.right;
        this.height = height - margin.top - margin.bottom;
        this.margin = margin;
        this.chart = chart.attr("width", this.width).attr("height", this.height);
        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(.1);
        this.y = d3.scaleLinear().range([this.height, 0]);
    }

    draw() {
        this.getData().then((data) => {

        })
    }

    defineScales(data) {
        this.x.domain()
    }

    getData() {
        return new Promise((resolve, reject) => {
            d3.tsv("data.tsv", this.type, (error, data) => {
                if (!error)
                    resolve(data);
                else
                    reject(error);
            })
        });
    }

    type(data) {
        data.value = +data.value;
        return data;
    }
}
var margin = { top: 20, right: 30, bottom: 30, left: 40 };
new Map(960, 500, d3.select(".chart")).draw();