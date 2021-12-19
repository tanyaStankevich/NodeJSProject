const fs = require('fs');
var myRe = /34.48.240.111/gm;
var myRe2 = /89.123.1.41/gm;

const readStream = fs.createReadStream('./Log.log', 'utf-8');
readStream.on('err', () => console.log(err));
readStream.on('end', () => console.log('Reading file is finished'));

const writeStream1 = fs.createWriteStream('./34.48.240.111_requests.log', { flags: 'a', encoding: 'utf-8' });
const writeStream2 = fs.createWriteStream('./89.123.1.41_requests.log', { flags: 'a', encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    console.log(chunk);

    var chunkStr = chunk.toString().split('\r');
    console.log(chunkStr);
    for (let i = 0; i <= chunkStr.length; i++){
        
        if (myRe.test(chunkStr [i])) {
          writeStream1.write(chunkStr [i]);
          writeStream1.write('\r');  
        };
        if (myRe2.test(chunkStr [i])) {
          writeStream2.write(chunkStr [i]);
          writeStream2.write('\r');  
        };

    }
    writeStream1.end(() => console.log('Writting to the file is finished'));
    writeStream2.end(()=>console.log('Writting to the file is finished'));
});
