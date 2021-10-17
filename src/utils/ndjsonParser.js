const fs = require('fs');
const { PassThrough } = require('stream');


parse = () => {
    const properties = [
        'domain',
        'firstTimeStamp',
        'context',
        'timeStamp',
        'domainType',
        'initiatedType',
        'hits',
        'type',
        'domainOwner',
        'bundleID'
    ];

    const activityMap = {};

    // read contents of the file
    const data = fs.readFileSync('../data/App_Privacy_Report.txt', 'UTF-8');

    // split the contents by new line which is definition of ndjson where json is separated by new line
    const lines = data.split(/\n/);


    // categorize data by count of certain app and app's acitivity
    lines.slice(0, lines.length - 1).forEach((line) => {
        row = JSON.parse(line);

        //remove variables that is identifier
        delete row["firstTimeStamp"];
        delete row["timeStamp"];
        delete row["identifier"];

        rowStr = JSON.stringify(row);
        if (!activityMap.hasOwnProperty(rowStr)) {
            activityMap[rowStr] = row.hits ? row.hits : 1;
        } else {
            activityMap[rowStr] += row.hits ? row.hits : 1;
        }
    });

    sortedActivityMap = Object.entries(activityMap)
        .sort(([, a], [, b]) => b - a);

    console.log(sortedActivityMap);
};

parse();
