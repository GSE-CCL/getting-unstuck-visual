const fs = require('fs');
const path = require('path');
const analysis = require('scratch-analysis');

const defaultObject = fs.readFileSync(
    // sb3
    path.resolve(__dirname, '../projects/Quentin_GU_Day1S3/project.json/')
);


analysis(defaultObject, function (err, result) {
    console.log(result);
    var show_result = result;
    console.log(show_result);
});