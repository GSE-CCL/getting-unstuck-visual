var scripts = [];
var sprites = [];
var block_count = [];
var scriptTemp = [];
var new_category_data = [];


// SVG MAKE
var margin = {top: 40, right: 10, bottom: 150, left: 60};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#blocks").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var cat_svg = d3.select("#category").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Scales for the Specific Block Visualization

var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(function(d) {
        var name = d;

        // assign x tick to the correct block label
        blocknames.forEach(function(dtwo){
            if(d === dtwo.name) {
                name = dtwo.label;
            }
        });

        return name;

    });

var yAxis = d3.axisLeft()
    .scale(y);

svg.append("g")
    .attr("class", "axis xaxis")
    .attr("transform", "translate(0," + height + ")")
    .transition().duration(2000)
    .call(xAxis);

svg.append("g")
    .attr("class", "axis yaxis")
    .transition().duration(2000)
    .call(yAxis);

// Scales for the Category Block Visualization

var cat_x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var cat_y = d3.scaleLinear()
    .range([height, 0]);

var cat_xAxis = d3.axisBottom()
    .scale(cat_x);

var cat_yAxis = d3.axisLeft()
    .scale(cat_y);

cat_svg.append("g")
    .attr("class", "axis xaxis")
    .attr("transform", "translate(0," + height + ")")
    .transition().duration(2000)
    .call(cat_xAxis);

cat_svg.append("g")
    .attr("class", "axis yaxis")
    .transition().duration(2000)
    .call(cat_yAxis);

d3.select("#block-cat").on("change", updateVisualization);

// Parse Data from Scratch projects with S3 file type, Quentin_GU_Day1S3
$(document).ready(function(){
    $.getJSON( "projects/Quentin_GU_Day1S3/project.json", function(json) {
        data = json;
        console.log(data.targets);
        data.targets.forEach(function(d) {
            if(d.isStage === false) {
                console.log(d.name);

                // console.log(d.blocks);
                // console.log(Object.keys(d.blocks).length);

                for (var value in d.blocks) {
                    // prints out block type
                    // console.log(d.blocks[value]["opcode"]);

                    // adds blocks to the script temp
                    scriptTemp.push(d.blocks[value]["opcode"]);
                }
                updateVisualization();

                // NEW VISUALIZATION! Block Categories

                // Creates array of dictionaries
                console.log(groupByOne(scriptTemp));
                var block_count_two = groupByOne(scriptTemp);

                block_count_two.sort( function(a, b){
                    return b.value - a.value;
                });

                var category_data_two = block_count_two;

                // Create Array of Dictionaries for Block Category Counts
                category_data_two = categoryGroup(category_data_two);
                new_category_data = groupByOne(category_data_two);

                // Create the bars

                console.log(new_category_data);
                var cat_bars  = cat_svg.selectAll("rect")
                    .data(new_category_data);

                cat_bars.enter()
                    .append("rect")
                    .attr("class", "bar")

                    // Enter and Update (set the dynamic properties of the elements)
                    .merge(cat_bars)
                    .transition()
                    .attr("x", function(d) {
                        return cat_x(d.key);
                    })
                    .attr("y", function(d) { return cat_y(d.value); })
                    .attr("width", cat_x.bandwidth())
                    .attr("height", function(d) { return height - cat_y(d.value); })
                    .attr("fill", function(d) {
                        if (d.key === "motion"){
                            return "#4681db";
                        }
                        if (d.key === "control") {
                            return "#f2ab1d"
                        }
                        if (d.key === "event") {
                            return "#ffcb3f"
                        }
                        if (d.key === "looks") {
                            return "#965ffc"
                        }
                        if (d.key === "operators") {
                            return "#4faa49"
                        }
                        if (d.key === "sensing") {
                            return "#66b2d6"
                        }
                        if (d.key === "sound") {
                            return "#ca70d8"
                        }
                        if (d.key === "variables") {
                            return "#ef7b28"
                        }
                        if (d.key === "more_blocks") {
                            return "#f75976"
                        }
                        return "black";
                    });

                // Makes new axis
                cat_svg.selectAll(".xaxis").transition().call(cat_xAxis)
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");

                var cat_newyAxis =
                    cat_yAxis.ticks(d3.max(new_category_data, function(d) { return d.value }))
                        .tickFormat(d3.format("d"));

                cat_svg.selectAll(".yaxis").transition().call(cat_newyAxis);

                // Exit
                cat_bars.exit().remove();

            }
        });
    })
});

updateVisualization();

function updateVisualization() {

    var boxVal = d3.select("#block-cat").property("value");

    // BOTTOM VISUALIZATION
    var box_blocknames = blocknames;

    box_blocknames = box_blocknames.filter(function(value) {
        return (value.category === boxVal);
    });
    console.log(box_blocknames);

    var specific_blocks = [];

    // Was not filtering so had to do manually

    if(boxVal !== "all") {
        scriptTemp.forEach(function(value) {
            box_blocknames.forEach(function(d){
                if(d.name === value) {
                    specific_blocks.push(value);
                }
            });
        });
    }
    else {
        specific_blocks = scriptTemp;
    }

    console.log(specific_blocks);

    // Creates array of dictionaries
    console.log(groupByOne(specific_blocks));
    block_count = groupByOne(specific_blocks);

    block_count.sort( function(a, b){
        return b.value - a.value;
    });


    var category_data = block_count;

    // Create Array of Dictionaries for Block Category Counts
    category_data = categoryGroup(category_data);
    new_category_data = groupByOne(category_data);

    // Set domain for the Specific Block Visualization
    x.domain(block_count.map(function(d) { return d.key; }));
    y.domain([0, d3.max(block_count, function(d) { return d.value })]);

    // Set domain for Category Block Visualization
    cat_x.domain(new_category_data.map(function(d) { return d.key; }));
    cat_y.domain([0, d3.max(new_category_data, function(d) { return d.value })]);

    console.log(block_count);
    console.log(block_count.length !== 0);
    if(block_count.length !== 0) {
        document.getElementById("suggestion").innerHTML = "You used " + block_count.length + " " + boxVal + " blocks.";
    }
    else {
        var cat_length = Math.floor((Math.random() * specific_blocks.length) + 1);
        console.log(box_blocknames);
        console.log(cat_length);
        console.log(box_blocknames[cat_length]);
        console.log(box_blocknames[cat_length].label);
        document.getElementById("suggestion").innerHTML = "You didn't use any " + boxVal + " blocks in this project. Have you considered using the <b>" + box_blocknames[cat_length].label + "</b> block?";
    }

    // Specific Block Frequency Bar Graph
    var bars  = svg.selectAll("rect")
        .data(block_count);

    bars.enter()
        .append("rect")
        .attr("class", "bar")

        // Enter and Update (set the dynamic properties of the elements)
        .merge(bars)
        .transition()
        .attr("x", function(d) {
            return x(d.key);
        })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) {
            if (motion_blocks.includes(d.key)){
                return "#4681db";
            }
            if (control_blocks.includes(d.key)) {
                return "#f2ab1d"
            }
            if (event_blocks.includes(d.key)) {
                return "#ffcb3f"
            }
            if (looks_blocks.includes(d.key)) {
                return "#965ffc"
            }
            if (operator_blocks.includes(d.key)) {
                return "#4faa49"
            }
            if (sensing_blocks.includes(d.key)) {
                return "#66b2d6"
            }
            if (sound_blocks.includes(d.key)) {
                return "#ca70d8"
            }
            if (variable_blocks.includes(d.key)) {
                return "#ef7b28"
            }
            if (my_blocks_blocks.includes(d.key)) {
                return "#f75976"
            }
            return "black";
        });

    // Makes new axis
    svg.selectAll(".xaxis").transition().call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    var newyAxis =
        yAxis.ticks(d3.max(block_count, function(d) { return d.value }))
            .tickFormat(d3.format("d"));

    svg.selectAll(".yaxis").transition().call(newyAxis);

    // Exit
    bars.exit().remove();

}

// Gets the scripts recursively
var getScriptArray = function addScript (s) {
    for(var i = 0; i < s.length; i++) {
        if (Array.isArray(s[i])) {
            addScript(s[i]);
        }
        if (typeof s[i] === "string") {
            scripts.push(s[i]);
        }
    }
    return scripts;
}

// Gets the sprites names
function getSpriteArray(s) {
    for (var i = 0; i < s.length; i++){
        sprites.push(s[i].objName);
    }
    return sprites;
}

// Counts the number of blocks
function groupBy(arr) {
    var dict = {};
    for(var i = 0; i < arr.length; i++){
        if(dict[arr[i]] == null) {
            dict[arr[i]] = 1;
        }
        else {
            dict[arr[i]] += 1;
        }
    }
    return dict;
}

// Creates array of dictionaries
function groupByOne(arr) {
    var dict = [];
    for(var i = 0; i < arr.length; i++){
        var count = 0;
        dict.forEach(function(d) {
            if(d.key === arr[i]) {
                d.value += 1;
                count += 1;
            }
        });

        if(count === 0) {
            dict.push({
                key: arr[i],
                value: 1
            });
        }

    }
    return dict;
}

// Group by block category
function categoryGroup(arr) {
    var category_dict = [];

    arr.forEach(function(d) {
        if (motion_blocks.includes(d.key)){
            category_dict.push("motion");
        }
        if (control_blocks.includes(d.key)) {
            category_dict.push("control");
        }
        if (event_blocks.includes(d.key)) {
            category_dict.push("event")
        }
        if (looks_blocks.includes(d.key)) {
            category_dict.push("looks")
        }
        if (operator_blocks.includes(d.key)) {
            category_dict.push("operators")
        }
        if (sensing_blocks.includes(d.key)) {
            category_dict.push("sensing")
        }
        if (sound_blocks.includes(d.key)) {
            category_dict.push("sound")
        }
        if (variable_blocks.includes(d.key)) {
            category_dict.push("variables")
        }
        if (my_blocks_blocks.includes(d.key)) {
            category_dict.push("more_blocks")
        }
    });

    return category_dict;
}