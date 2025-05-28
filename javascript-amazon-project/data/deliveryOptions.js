import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

// function for getting full deliveryOption data
// from given deliveryProductId
export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

      deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
          deliveryOption = option;
        }
      });
      //to be safe return default value if we don't find deliveryOption
    return deliveryOption || deliveryOptions[0];
}

// 16m.
export function validDeliveryOption(deliveryOptionId){
    let found = false;
     deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
            found = true;
        }
    });
    return found;
}

//check if delivery date would be weekend
export function isWeekendDelivery(date){
    const dayOfWeek = date.format('dddd');

                if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
                    return dayOfWeek;
                } else{
                    return 0;
                }
}


// napravili smo funkciju calculateDeliveryDate(deliveryOption)
// koja vraca formatiran dateString
export function calculateDeliveryDate(deliveryOption){
   const today = dayjs();
   const daysToAdd = deliveryOption.deliveryDays;


  /* 15m ovaj dio koda je napravljen kako se u delivery days nebi
            racunali vikendi, ako je dostava za 3 dana, a ukljucuje vikend,
            dostava ce onda biti za 5 dana   */
   let deliveryDate = today;
   let dayOfWeek = '';
   let numOfWeekendDays = 0;

   let trenutniDatum = today;
   let finalDaysToAdd = daysToAdd;

  /*  koliko određena delivery opcija ima dana za dostavu (daysToAdd)
      za toliko ćemo dana kroz petlju proći od danasanjeg dana, do datuma
      danasnjeg dana uvecanog za daysToAdd, prolazeci kroz svaki od tih dana
      provjeravat ćemo jel taj dan subota ili nedjelja
      ako je u varijablu  numOfWeekendDays spremi koliko je vikend dana bilo
      i dodaj ih na kraju na taj broj daysToAdd koji je spremljen u varijabli
      finalDaysToAdd - na taj način u broj potrebnih dana za dostavu određene 
      delivery opcije ne računamo vikende
      */

    for(let i = 0; i < daysToAdd; i++){
        trenutniDatum = trenutniDatum.add(1, 'days');
        dayOfWeek = trenutniDatum.format('dddd');

        if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
           numOfWeekendDays+=1;
        }
      }
      finalDaysToAdd+=numOfWeekendDays;
  
      /*  delivery date se na kraju dobija uvećavanjem današnjeg datuma 
      za dobijeni finalDaysToAdd */
   deliveryDate = today.add(finalDaysToAdd, 'days');

    /* ako je i konačni deliverydate spada u vikend onda dodaj još dan 
      ili dva da ne bude vikend 
      15.k - vidi jel vikend, ako da posalji dan ili dva dana kasnije */
         
     if(isWeekendDelivery(deliveryDate) !== 0 ){
        let deliveryDay = isWeekendDelivery(deliveryDate);
    
        if(deliveryDay === 'Saturday'){
          deliveryDate = deliveryDate.add(2, 'days');
          finalDaysToAdd+=2;
          
        } else{
          deliveryDate = deliveryDate.add(1, 'days');
          finalDaysToAdd+=1;

        }
      }

  // insert this dateString in HTML (.delivery-date)
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

    return [dateString, finalDaysToAdd];
}
