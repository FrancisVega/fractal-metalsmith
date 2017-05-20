const fs = require('fs-extra');
const path = require('path');

const SRC = './fractal/components';
const DST = './flat-components';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
return filelist;
}

const sourceCompos = walkSync(SRC)
  // Filter just twigs files
  .filter( file => path.extname(file) == ".twig")
  // Copy, Modify and Write
  .map( file => {
    fs.copySync(file, `${DST}/${path.basename(file)}`);
    const content = fs.readFileSync(file, 'utf8');
    const contentModified = content.replace(/{% include '@(\w+)/g, "{% include '$1.twig");
    fs.writeFileSync(DST + "/" + path.basename(file), contentModified);
  })
