///<reference path="../node_modules/d3/build/d3.js" />

class Map {
    constructor(width, height, margin, chartSelector) {
        this.width = width - margin.left - margin.right;
        this.height = height - margin.top - margin.bottom;
        this.margin = margin;
        this.chart = d3.select(chartSelector).attr("width", this.width).attr("height", this.height);
        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(.1);
        this.y = d3.scaleLinear().range([this.height, 0]);
    }

    draw() {
        this.getData().then((data) => {
            this.defineScales(data);
            this.appendAxes();
            this.addChart(data);
        });
    }

    defineScales(data) {
        this.x.domain(data.map((d) => { return d.name; }));
        this.y.domain([0, d3.max(data, (d) => { return d.value; })]);
    }
    appendAxes() {
        this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));
        this.chart.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(this.y));
    }

    addChart(data) {
        this.chart.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => { return this.x(d.name); })
            .attr("y", (d) => { return this.y(d.value); })
            .attr("height", (d) => { return this.height - this.y(d.value); })
            .attr("width", this.x.rangeRound());
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
        data.value = (+data.value) * 100;
        return data;
    }
}
var margin = { top: 20, right: 30, bottom: 30, left: 40 };
new Map(960, 500, margin, ".chart").draw();