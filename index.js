// hometask1

// const colors = require('colors');
// const { exit } = require('process');
// const prompt = require('prompt');

// const parseInt = require('parseint');

// var col = colors.green;
// let arr = [];

// prompt.get(['start', 'fin'], function(err, result){
    
//     if(parseInt(result.start) == NaN || parseInt(result.fin)==NaN) {
        
    
//         console.log(colors.red('Вы ввели не число'));
//         exit;
//     }
    
   

//     next:
  
//     for (let i = result.start; i <= result.fin; i++){
//         for (j = 2; j < i; j++){
//             if (i % j == 0) continue next;
//         }
        
//         arr.push(i);
        
//         console.log(col(i));
        
//         if (col === colors.green) { col = colors.yellow; }
//         else if (col === colors.yellow) { col = colors.red; }
//         else if (col === colors.red) { col = colors.green; }

//     }
//     if (arr == []) {
//                 console.log(colors.red('В выбранном диапазоне нет простых чисел'));
//             }
//     }
 
// )

//hometask2 task1

// в консоли увидим:
// 1
// 5
// 6
// 2
// 3
// 4

//hometask2 task2, ввод не через файл, а через терминал (запрос у пользователя данных)

const moment = require('moment');
const prompt = require('prompt');
const EventEmmeter = require('events');



let timerDateFormat, timerHourFormat, hour, date;

let dateNow = moment().format('D-MMM-YYYY');
let hourNow = moment().format('h-m');
console.log('сегодняшняя дата: '+ dateNow+', время:' + hourNow);

console.log('Введите время и дату, до которых нужно установить таймер')

prompt.get(['hour','day', 'month', 'year'], function (err,result) {
    timerHour = result.hour;
    let timerDay = result.day;
    let timerMonth = result.month;
    let timerYear = result.year;
    
    let timerDate = timerYear + '-' + timerMonth + '-' + timerDay; 
    console.log(timerDate);

    timerDateFormat = moment(timerDate).format('D-MMM-YYYY');
    timerHourFormat = moment(timerHour).format('h-m');

    console.log('Вы устанавливаете таймер до даты: ' + timerDateFormat + ' время ' + timerHourFormat);
    let dateFin = moment.duration(timerDateFormat - dateNow).minutes();
    
    console.log(dateFin);
    return timerDateFormat, timerHourFormat;
    
})


//описываем все типы таймеров
const typesTimer = [
    {
        type: hour,
        payload: timerHourFormat,
    },
    {
        type: date,
        payload: timerDateFormat,
    },
    
];

class Timer{
    constructor(param) {
        this.type = param.type; 
        this.payload = param.payload;
    }
}

class Handler{
    // static hour(payload) {
    //     console.log(`${ payload }`);
    // };
    
    static date() {
        for (var m = moment(dateNow); m.isBefore(timerDateFormat); m.subtract(1,'minutes')){
            console.log(m.format('D-MMM-YYYY'));
        }
        
    };
    
}

class MyEmmeter extends EventEmmeter { };
const emmeterObject = new MyEmmeter();

// emmeterObject.on('hour', Handler.hour);



const run = () => {
    
    
    emmeterObject.emit('date', new Timer());
    emmeterObject.on('date', Handler.date);
    emmeterObject.emit('error', new Error('Что-то пошло не так!'));
    
}
setInterval(run(), 1000);