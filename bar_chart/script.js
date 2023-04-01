(async () => {
    // Load the data
    const data = await d3.json("enrollment.json");
    // Define the dimensions of the chart area
    var margin = { top: 55, right: 120, bottom:240, left: 120 },
        width = 1450 - margin.left - margin.right,
        height = 900- margin.top - margin.bottom;


    // Create a scale for the x-axis based on the college names
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.college; }))
        .range([0, width])
        .padding(0.1);

    // Create a scale for the y-axis based on the enrollment values
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.enrollment; })])
        .range([height, 0]);

    // Append the SVG element to hold the chart
    var svg = d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Append the x-axis and y-axis to the SVG element
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "-0.15em")
        .attr("transform", function(d) {
            return "rotate(-65)"
        });

    // Add title to the bar chart
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text("2019 UMICH Each College Student Enrollment");

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Create a function to create the bars for the chart
    var bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.college); })
        .attr("y", height) // Set initial y value to height (start at the bottom)
        .attr("width", x.bandwidth())
        .attr("height", 0) // Set initial height to 0
        .style("fill", "darkseagreen");

    // Add animation for loading the bars
    bars.transition()
        .duration(1000)
        .attr("y", function(d) { return y(d.enrollment); })
        .attr("height", function(d) { return height - y(d.enrollment); });

    // Add interactivity to the chart by adding event listeners to the bars
    bars.on("mouseover", function(d) {
        d3.select(this).style("fill", "orange");
    })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "steelblue");
        })
        .on("click", function(event, d) { // Add click event listener
            var xPos = x(d.college) + x.bandwidth() / 2;
            var yPos = y(d.enrollment) - 10;
            var enrollmentText = d.enrollment;

            // Remove any existing text
            svg.selectAll(".enrollment-text").remove();

            // Add text element for the clicked bar
            svg.append("text")
                .attr("class", "enrollment-text")
                .attr("x", xPos)
                .attr("y", yPos)
                .text(enrollmentText)
                .style("text-anchor", "middle");
        });
})();

