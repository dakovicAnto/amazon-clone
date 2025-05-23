import {formatCurrency} from '../../scripts/utils/money.js';

// give this Group of related tests - test suite a name
console.log('test suite: formatCurrency');

// Try to test something different in each test case

//test case 1
//basic testcase
console.log('converts cents into dollars'); // give each test a name
// Naming convention - describe what the code is doing
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
} else{
    console.log('failed');

}

//test case 2
// edge test case
console.log('works with zero');
if(formatCurrency(0) === '0.00'){
    console.log('passed');
} else{
    console.log('failed');
}

//test case 3
// edge test case
console.log('rounds up to the nearest cent');
if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
} else{
    console.log('failed');
}

//test case 4 16.a
// edge test case
console.log('rounds down to the nearest cent');
if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
} else{
    console.log('failed');
}

//test case 5 16.b
/* console.log('works with negative number');
if(formatCurrency(-1100) === '-11.00'){
    console.log('passed');
} else{
    console.log('failed');
} */


//test case 5 16.b - Moj pokusaj pravljenja it - expect funkcije

function it(message, parameter){
    if(parameter() === true){
        console.log(message);
        console.log('passed');
    } else{
        console.log(message);
        console.log('failed');
    }
}

it('works with negative number', () =>{
    if(formatCurrency(-1100) === '-11.00'){
        return true;
    } else {
        false
    };
});

