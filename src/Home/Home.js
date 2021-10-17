import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ndjson } from 'ndjson';
let fs = require('fs');

function Home() {
    const [data, setData] = useState();
    const readData = () => {
        fs.createReadStream('../data/App_Privacy_Report.txt')
            .pipe(ndjson.parse())
            .on('data', function (obj) {
                // obj is a javascript object
                console.log(obj);
            });
    };

    useEffect(() => {
        readData();
    });
    return (
        <Box>
            <Typography>
                Hello!
            </Typography>
        </Box>
    );
};

export default Home;