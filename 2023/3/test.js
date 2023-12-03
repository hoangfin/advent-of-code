const path = require('path');
const fs = require('fs');

const data = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.toString()
.trim()
.split('\n').slice(0, -1);
let nums = 0;
let num = "";
let sign = false;

for (let i = 0; i < data.length; i++) {
    num = "";
    for (let j = 0; j < data[i].length; j++) {
        if (!isNaN(data[i][j])) {
            num+= data[i][j];
            if(data[i-1] != undefined && data[i-1][j-1] != undefined && isNaN(data[i-1][j-1]) && data[i-1][j-1] != '.') {
                sign = true;
            }
            if (data[i-1] != undefined && isNaN(data[i-1][j]) && data[i-1][j] != '.') {
                sign = true;
            }
            if (data[i-1] != undefined && data[i-1][j+1] != undefined && isNaN(data[i-1][j+1]) && data[i-1][j+1] != '.') {
                sign = true;
            }
            if(data[i][j-1] != undefined && isNaN(data[i][j-1]) && data[i][j-1] != '.') {
                sign = true;
            }
            if (data[i][j+1] != undefined && isNaN(data[i][j+1]) && data[i][j+1] != '.') {
                sign = true;
            }
            if (data[i+1] != undefined && data[i+1][j-1] != undefined && isNaN(data[i+1][j-1]) && data[i+1][j-1] != '.') {
                sign = true;
            }
            if (data[i+1] != undefined && isNaN(data[i+1][j]) && data[i+1][j] != '.') {
                sign = true;
            }
            if (data[i+1] != undefined && data[i+1][j+1] != undefined && isNaN(data[i+1][j+1]) && data[i+1][j+1] != '.') {
                sign = true;
            }
        }
        if(data[i][j+1] != undefined && data[i][j+1] === '.' && !sign) {
            num = "";
        }
        if(sign && isNaN(data[i][j+1])) {
            sign = false;
            nums += parseInt(num);
            num = "";
        }
    }
	console.log(num);
}

console.log(`Part 1 -> ${nums}`);