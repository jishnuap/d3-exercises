///<reference path="../node_modules/d3/build/d3.js" />

class Map {
    constructor(barHeight, width, svg) {
        this.barHeight = barHeight;
        this.width = width;
        this.parent = parent;
        this.chart = svg.attr("width", this.width);
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.bar = null;
    }

    draw() {
        this.getData().then((data) => {
            this.defineScale(data);
            this.setChartHeight(this.barHeight * data.length);
            this.setBarTransform(data);
            this.setBarAttr();
            this.setBarText();
        }).catch((error) => {
            console.log(error);
        });
    }

    defineScale(data) {
        this.xScale.domain([0, d3.max(data, (d) => {
            return d.value;
        })]);
    }

    setChartHeight(height) {
        this.chart.attr("height", height);
    }

    setBarAttr() {
        this.bar.append("rect")
            .attr("width", (d) => { return this.xScale(d.value) - 3 })
            .attr("height", this.barHeight - 1);
    }

    setBarTransform(data) {
        this.bar = this.chart.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => {
                return "translate(0," + i * this.barHeight + ")";
            });
        console.log(this.bar);
    }

    setBarText() {
        this.bar.append("text")
            .attr("x", (d) => { return this.xScale(d.value) - 10 })
            .attr("y", this.barHeight / 2)
            .attr("dy", ".35em")
            .text((d) => { return d.value; })
    }

    getData() {
        return new Promise((resolve, reject) => {
            d3.tsv("data.tsv", this.type, (error, data) => {
                if (!error)
                    resolve(data);
                else
                    reject(error);
            });
        })
    }
    type(d) {
        d.value = +d.value;
        return d;
    }

}

new Map(40, 420, d3.select(".chart")).draw();