const { Chess } = require('chess.js/chess.js');

fs = require('fs');

const data = fs.readFileSync('Alekhine.txt');


const regex = /#/g;
let pgns = data.toString().split('\r\n\r\n').reduce((accArr, curVal) => {
    if (curVal.startsWith('1.') && regex.exec(curVal)) {
        accArr.push(curVal.replace(/\r\n/g, ' '));
    }
    return accArr;
}, []);
fs.writeFileSync('pgnWithCheckmate.js', 'export default ' + JSON.stringify(pgns));


/*const regex = /\r\n\r\n/g;
let result, indices = [];
const pgns = [];
while (result = regex.exec(data)) {
    let pgn = '';
    let i = result.index;
    while (data.slice(i, i + 2) !== '1.') {
        pgn += data[i--];
        if (result.index - i > 10000) {
            break;
        }
    }
    console.log(pgn);
    console.log(result.index);
    indices.push(result.index);
}
console.log(indices.length);*/
