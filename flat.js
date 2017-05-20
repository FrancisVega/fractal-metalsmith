const fs = require('fs-extra');
const path = require('path');
const recursive = require('recursive-readdir');

const PATH = './design/components';
const DEST = './flat-components';

recursive('./design/components', ['!*.twig'], (err, files) => {

  files.map(file => {
    console.log(file);
    fs.copySync(file, `${DEST}/${path.basename(file)}`);
  })


})


