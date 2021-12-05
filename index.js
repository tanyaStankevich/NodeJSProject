const colors = require('colors');
const { exit } = require('process');
const prompt = require('prompt');

const parseInt = require('parseint');

var col = colors.green;
let arr = [];

prompt.get(['start', 'fin'], function(err, result){
    
    if(parseInt(result.start) == NaN || parseInt(result.fin)==NaN) {
        
    
        console.log(colors.red('Вы ввели не число'));
        exit;
    }
    
   

    next:
  
    for (let i = result.start; i <= result.fin; i++){
        for (j = 2; j < i; j++){
            if (i % j == 0) continue next;
        }
        
        arr.push(i);
        
        console.log(col(i));
        
        if (col === colors.green) { col = colors.yellow; }
        else if (col === colors.yellow) { col = colors.red; }
        else if (col === colors.red) { col = colors.green; }

    }
    if (arr == []) {
                console.log(colors.red('В выбранном диапазоне нет простых чисел'));
            }
    }
 
)


