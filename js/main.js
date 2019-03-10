var scripts = [];
var sprites = [];

// Move to separate folder later (Include List Blocks)

// Dictionary of Block Names (name, label, and category)
var blocknames = [{name: "motion_movesteps", label: "Move Steps", category: "motion"}, {name: "motion_turnright", label: "Turn Right", category: "motion"}, {name: "motion_turnleft", label: "Turn Left", category: "motion"},
                  {name: "motion_goto", label: "Go to", category: "motion"}, {name: "motion_goto_menu", label: "Go to Menu", category: "motion"}, {name: "motion_gotoxy", label: "Go to XY", category: "motion"},
                  {name: "motion_glideto", label: "Glide To", category: "motion"}, {name: "motion_glidesecstoxy", label: "Glide Secs to XY", category: "motion"}, {name: "motion_pointindirection", label: "Point in Direction", category: "motion"},
                  {name: "motion_pointtowards_menu", label: "Point Towards Menu", category: "motion"}, {name: "motion_pointtowards", label: "Point Towards", category: "motion"},
                  {name: "motion_changexby", label: "Change X By", category: "motion"}, {name: "motion_setx", label: "Set X", category: "motion"}, {name: "motion_changeyby", label: "Change Y By", category: "motion"},
                  {name: "motion_sety", label: "Set Y", category: "motion"}, {name: "motion_ifonedgebounce", label: "If on Edge, Bounce", category: "motion"}, {name: "motion_setrotationstyle", label: "Set Rotation Style", category: "motion"},
                  {name: "motion_xposition", label: "X Position", category: "motion"}, {name: "motion_yposition", label: "Y Position", category: "motion"},
                  {name: "motion_direction", label: "Direction", category: "motion"}, {name: "control_wait", label: "Wait Seconds", category: "control"}, {name: "control_repeat", label: "Repeat", category: "control"},
                  {name: "control_if", label: "If", category: "control"}, {name: "control_forever", label: "Forever", category: "control"},
                  {name: "control_repeat_until", label: "Repeat Until", category: "control"}, {name: "control_stop", label: "Stop", category: "control"},
                  {name: "control_start_as_clone", label: "Start as Clone", category: "control"}, {name: "control_create_clone_of", label: "Create Clone of", category: "control"},
                  {name: "control_create_clone_of_menu", label: "Create Clone of", category: "control"}, {name: "control_delete_this_clone", label: "Delete this Clone", category: "control"},
                  {name: "control_if_else", label: "If Else", category: "control"}, {name: "control_wait_until", label: "Wait Until", category: "control"},
                  {name: "event_whenflagclicked", label: "When Flag Clicked", category: "event"}, {name: "event_whenkeypressed", label: "When Key Pressed", category: "event"},
                  {name: "event_whenthisspriteclicked", label: "When Sprite Clicked", category: "event"}, {name: "event_whenflagclicked", label: "When Flag Clicked", category: "event"},
                  {name: "event_whenbackdropswitchesto", label: "When Backdrop Switches to", category: "event"}, {name: "event_whengreaterthan", label: "When Greater Than", category: "event"},
                  {name: "event_whenbroadcastreceived", label: "When Broadcast Received", category: "event"}, {name: "event_broadcast", label: "Broadcast", category: "event"},
                  {name: "event_broadcastandwait", label: "Broadcast Event and Wait", category: "event"},
                  {name: "looks_sayforsecs", label: "Say for Secs", category: "looks"}, {name: "looks_say", label: "Say", category: "looks"},
                  {name: "looks_switchcostumeto", label: "Switch Costume", category: "looks"}, {name: "looks_costume", label: "Costume", category: "looks"},
                  {name: "looks_nextcostume", label: "Next Costume", category: "looks"}, {name: "looks_switchbackdropto", label: "Switch Backdrop To", category: "looks"},
                  {name: "looks_backdrops", label: "Backdrops", category: "looks"}, {name: "looks_nextbackdrop", label: "Next Backdrop", category: "looks"},
                  {name: "looks_changesizeby", label: "Change Size By", category: "looks"}, {name: "looks_setsizeto", label: "Set Size To", category: "looks"},
                  {name: "looks_changeeffectby", label: "Change Effect By", category: "looks"}, {name: "looks_seteffectto", label: "Set Effect To", category: "looks"},
                  {name: "looks_cleargraphiceffects", label: "Clear Graphic Effects", category: "looks"}, {name: "looks_show", label: "Show", category: "looks"},
                  {name: "looks_hide", label: "Hide", category: "looks"}, {name: "looks_gotofrontback", label: "Go to Front/Back Layer", category: "looks"},
                  {name: "looks_goforwardbackwardlayers", label: "Go Forward/Backwards Layers", category: "looks"}, {name: "looks_costumenumbername", label: "Costume Number Name", category: "looks"},
                  {name: "looks_backdropnumbername", label: "Backdrop Number Name", category: "looks"}, {name: "looks_size", label: "Size", category: "looks"},
                  {name: "looks_thinkforsecs", label: "Think for Secs", category: "looks"}, {name: "looks_think", label: "Think", category: "looks"},
                  {name: "operator_add", label: "Add", category: "operators"}, {name: "operator_subtract", label: "Subtract", category: "operators"},
                  {name: "operator_random", label: "Random", category: "operators"}, {name: "operator_gt", label: "Greater Than", category: "operators"},
                  {name: "operator_lt", label: "Less Than", category: "operators"}, {name: "operator_equals", label: "Equals", category: "operators"},
                  {name: "operator_and", label: "And", category: "operators"}, {name: "operator_round", label: "Round", category: "operators"},
                  {name: "operator_mathop", label: "Other Math Operation", category: "operators"}, {name: "operator_or", label: "Or", category: "operators"},
                  {name: "operator_not", label: "Not", category: "operators"}, {name: "operator_join", label: "Join", category: "operators"},
                  {name: "operator_letter_of", label: "Letter of", category: "operators"}, {name: "operator_length", label: "Length of", category: "operators"},
                  {name: "operator_contains", label: "Parameter Contains", category: "operators"}, {name: "operator_mod", label: "Modulo", category: "operators"},
                  {name: "operator_multiply", label: "Multiply", category: "operators"}, {name: "operator_divide", label: "Divide", category: "operators"},
                  {name: "sensing_touchingobject", label: "Touching Object", category: "sensing"}, {name: "sensing_touchingobjectmenu", label: "Touching Specific Object", category: "sensing"},
                  {name: "sensing_touchingcolor", label: "Touch Color", category: "sensing"}, {name: "sensing_coloristouchingcolor", label: "Color is Touching Color", category: "sensing"},
                  {name: "sensing_distanceto", label: "Distance To Object", category: "sensing"}, {name: "sensing_distancetomenu", label: "Distance to Specific Object", category: "sensing"},
                  {name: "sensing_keypressed", label: "Key Pressed", category: "sensing"}, {name: "sensing_keyoptions", label: "Key Options", category: "sensing"},
                  {name: "sensing_mousedown", label: "Mouse Down", category: "sensing"}, {name: "sensing_mousex", label: "Mouse X", category: "sensing"},
                  {name: "sensing_mousey", label: "Mouse Y", category: "sensing"}, {name: "sensing_setdragmode", label: "Set Drag Mode", category: "sensing"},
                  {name: "sensing_loudness", label: "Loudness", category: "sensing"}, {name: "sensing_timer", label: "Timer", category: "sensing"},
                  {name: "sensing_resettimer", label: "Reset Timer", category: "sensing"}, {name: "sensing_of", label: "Sensing Of", category: "sensing"},
                  {name: "sensing_of_object_menu", label: "Sensing of Object", category: "sensing"}, {name: "sensing_current", label: "Current Time Variable", category: "sensing"},
                  {name: "sensing_dayssince2000", label: "Days Since 2000", category: "sensing"}, {name: "sensing_username", label: "Username", category: "sensing"},
                  {name: "sensing_askandwait", label: "Ask and Wait", category: "sensing"}, {name: "sensing_answer", label: "Answer", category: "sensing"},
                  {name: "sound_sounds_menu", label: "Sounds Menu", category: "sound"}, {name: "sound_playuntildone", label: "Play Until Done", category: "sound"},
                  {name: "sound_stopallsounds", label: "Stop All Sounds", category: "sound"}, {name: "sound_changeeffectby", label: "Change Effect By", category: "sound"},
                  {name: "sound_seteffectto", label: "Set Effect To", category: "sound"}, {name: "sound_cleareffects", label: "Clear Effects", category: "sound"},
                  {name: "sound_changevolumeby", label: "Change Volume By", category: "sound"}, {name: "sound_setvolumeto", label: "Set Volume To", category: "sound"},
                  {name: "sound_volume", label: "Volume", category: "sound"}, {name: "sound_play", label: "Play", category: "sound"},
                  {name: "data_showvariable", label: "Show Variable", category: "variables"}, {name: "data_hidevariable", label: "Hide Variable", category: "variables"},
                  {name: "procedures_definition", label: "Block Definition", category: "more_blocks"}, {name: "procedures_prototype", label: "Block Prototype", category: "more_blocks"},
                  {name: "procedures_call", label: "Block Call", category: "more_blocks"},
                  {name: "data_setvariableto", label: "Set Variable To", category: "variables"}, {name: "data_changevariableby", label: "Change Variable By", category: "variables"}];

var motion_blocks = ["motion_movesteps", "motion_turnright", "motion_turnleft", "motion_goto",
                     "motion_goto_menu", "motion_gotoxy", "motion_glideto", "motion_glideto_menu",
                     "motion_glidesecstoxy", "motion_pointindirection", "motion_pointtowards_menu", "motion_pointtowards", "motion_changexby",
                     "motion_setx", "motion_changeyby", "motion_sety", "motion_ifonedgebounce",
                     "motion_setrotationstyle", "motion_xposition", "motion_yposition", "motion_direction"];

var control_blocks = ["control_wait", "control_repeat", "control_forever", "control_if", "control_if_else",
                    "control_wait_until", "control_repeat_until", "control_stop", "control_start_as_clone",
                    "control_create_clone_of", "control_create_clone_of_menu", "control_delete_this_clone"];

var event_blocks = ["event_whenflagclicked", "event_whenkeypressed", "event_whenthisspriteclicked", "event_whenflagclicked",
                    "event_whenbackdropswitchesto", "event_whengreaterthan", "event_whenbroadcastreceived",
                    "event_broadcast", "event_broadcastandwait"];

var look_blocks = ["looks_sayforsecs", "looks_say", "looks_thinkforsecs", "looks_think", "looks_switchcostumeto", "looks_costume", "looks_nextcostume",
                    "looks_switchbackdropto", "looks_backdrops", "looks_nextbackdrop", "looks_changesizeby", "looks_setsizeto",
                    "looks_changeeffectby", "looks_seteffectto", "looks_cleargraphiceffects", "looks_show", "looks_hide",
                    "looks_gotofrontback", "looks_goforwardbackwardlayers", "looks_costumenumbername",  "looks_backdropnumbername", "looks_size"];

var operator_blocks = ["operator_add", "operator_subtract", "operator_multiply", "operator_divide", "operator_random",
                        "operator_gt", "operator_lt", "operator_equals", "operator_and", "operator_or", "operator_not", "operator_join",
                        "operator_letter_of", "operator_length", "operator_contains", "operator_mod", "operator_round", "operator_mathop"];

var sensing_blocks = ["sensing_touchingobject", "sensing_touchingobjectmenu", "sensing_touchingcolor", "sensing_coloristouchingcolor",
                        "sensing_distanceto", "sensing_distancetomenu", "sensing_askandwait", "sensing_answer", "sensing_keypressed", "sensing_keyoptions",
                        "sensing_mousedown", "sensing_mousex", "sensing_mousey", "sensing_setdragmode", "sensing_loudness", "sensing_timer",
                        "sensing_resettimer", "sensing_of", "sensing_of_object_menu", "sensing_current", "sensing_dayssince2000", "sensing_username"];

var sound_blocks = ["sound_sounds_menu", "sound_playuntildone", "sound_play", "sound_stopallsounds", "sound_changeeffectby", "sound_seteffectto",
                    "sound_cleareffects", "sound_changevolumeby", "sound_setvolumeto", "sound_volume"];

var variable_blocks = ["data_setvariableto", "data_changevariableby", "data_showvariable", "data_hidevariable"];

var my_blocks = ["procedures_definition", "procedures_prototype", "procedures_call"];


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

// Parse Data from Scratch projects with S3 file type, Quentin_GU_Day1S3
$(document).ready(function(){
    $.getJSON( "projects/Quentin_GU_Day1S3/project.json", function(data) {
        console.log(data.targets);
        data.targets.forEach(function(d) {
            if(d.isStage === false) {
                console.log(d.name);

                // console.log(d.blocks);
                // console.log(Object.keys(d.blocks).length);

                var scriptTemp = [];

                for (var value in d.blocks) {
                    // prints out block type
                    // console.log(d.blocks[value]["opcode"]);

                    // adds blocks to the script temp
                    scriptTemp.push(d.blocks[value]["opcode"]);
                }

                console.log(scriptTemp);
                console.log(groupBy(scriptTemp));

                // Creates array of dictionaries
                console.log(groupByOne(scriptTemp));

                var block_count = groupByOne(scriptTemp);

                block_count.sort( function(a, b){
                    return b.value - a.value;
                });

                console.log(block_count);
                var category_data = block_count;

                // Create Array of Dictionaries for Block Category Counts
                category_data = categoryGroup(category_data);
                var new_category_data = groupByOne(category_data);

                // Set domain for the Specific Block Visualization
                x.domain(block_count.map(function(d) { return d.key; }));
                y.domain([0, d3.max(block_count, function(d) { return d.value })]);

                // Set domain for Category Block Visualization
                cat_x.domain(new_category_data.map(function(d) { return d.key; }));
                cat_y.domain([0, d3.max(new_category_data, function(d) { return d.value })]);

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
                        if (look_blocks.includes(d.key)) {
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
                        if (my_blocks.includes(d.key)) {
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


                // NEW VISUALIZATION! Block Categories

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
                        console.log(d);
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
                        if (d.key === "operator") {
                            return "#4faa49"
                        }
                        if (d.key === "sensing") {
                            return "#66b2d6"
                        }
                        if (d.key === "sound") {
                            return "#ca70d8"
                        }
                        if (d.key === "variable") {
                            return "#ef7b28"
                        }
                        if (d.key === "my blocks") {
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
        })

    });
});


// Works for Scratch projects with S3 taken from Network
// $(document).ready(function(){
//         $.getJSON( "projects/245201829.json", function(data) {
//
// 		});
// });

// Works for Scratch projects with S2 file type
// $(document).ready(function(){
//         $.getJSON( "projects/Quentin_GU_Day1S2/project.json", function(data) {
//   			console.log(data);
//
//   			for(var i = 0; i < data.children.length; i++) {
//                 // console.log(getScriptArray(data.children[i].scripts));
//                 var array = groupBy(getScriptArray(data.children[i].scripts))
//                 console.log(array);
//
//                 var items = Object.keys(array).map(function(key) {
//                     return [key, array[key]];
//                 });
//
//                 // Sort the array based on the block frequency
//                 items.sort(function(first, second) {
//                     return second[1] - first[1];
//                 });
//
//                 console.log(items);
//                 console.log(items.slice(0, 5));
//
//                 $('#blocks').html(items.slice(0, 3) + '<br>')
//             }
//   			console.log(getSpriteArray(data.children));
// 		});
// });

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
        if (look_blocks.includes(d.key)) {
            category_dict.push("looks")
        }
        if (operator_blocks.includes(d.key)) {
            category_dict.push("operator")
        }
        if (sensing_blocks.includes(d.key)) {
            category_dict.push("sensing")
        }
        if (sound_blocks.includes(d.key)) {
            category_dict.push("sound")
        }
        if (variable_blocks.includes(d.key)) {
            category_dict.push("variable")
        }
        if (my_blocks.includes(d.key)) {
            category_dict.push("my blocks")
        }
    });

    return category_dict;
}