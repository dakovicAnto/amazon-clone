import {formatCurrency} from '../../scripts/utils/money.js';
// describe and it are f provided by jasmine

//test case 1
describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    //does same thing as... 

    /* function it(message, parameter){
        if(parameter() === true){
            console.log(message);
            console.log('passed');
        } else{
            console.log(message);
            console.log('failed');
        }
    }

    it('works with negative number', () =>{
        if(formatCurrency(2095) === '20.95'){
            return true;
        } else {
            false
        };
    }); ------------------------------------------ */

    // ...but with one line of code

    //test case 2
    it('works with zero', () => {
            expect(formatCurrency(0)).toEqual('0.00');
        });

        // same as:

    /* test case 2
    console.log('works with zero');
    if(formatCurrency(0) === '0.00'){
        console.log('passed');
    } else{
        console.log('failed');
    } ----------------------------------- */


    //test case 3
      it('rounds up to the nearest cent', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
        });

    //test case 4 16.a
     it('rounds down to the nearest cent', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
        });

    
    //test case 5 16.b
     it('works with negative number', () => {
            expect(formatCurrency(-1100)).toEqual('-11.00');
        });


});
