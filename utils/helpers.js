const getFormattedDate = () => {
  const currentDate = new Date();
  const year = String(currentDate.getFullYear());
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};

const getFormattedTime = () => {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const formattedTime = hours + ":" + minutes + ":" + seconds;
  return formattedTime;
};

function calculateTotalPrice(items) {
  return items.reduce((accumulator, item) => accumulator + item.price, 0);
}
function mapItemsFormat(items) {
  return items.map((ItemsInput) => ({
    shortDescription: ItemsInput.shortDescription,
    price: ItemsInput.price,
  }));
}
function alphNumCharResults(alphNumChar) {
  if (!alphNumChar) {
    return 0; 
  }
  
  const points = (alphNumChar.match(/[a-zA-Z0-9]/g) || []).length;
  return points;
}

function calculateRoundDollarPoints(roundDollar) {
  return roundDollar ? 5 : 0;

  // if (!roundDollar) {
  //   return 0;
  // }
  // return 5;
  // if (roundDollar) {
  //   return 5;
  // }
  // if (Number.isInteger(total) === true) 
  //   return 50;
  // else
  // return 0;

  // const cents = total % 1;
  // if (cents === 0) {
  //   return 50;
  // } else {
  //   return 0;
  // }
}

function totalMulOfQuarter(totalMultipleOfQuarter) {
  if (totalMultipleOfQuarter% 0.25 === 0) {
    return 25;
  } else {
    return 0;
  }
}
function forPairedItems(pairItems) {
  return Math.floor(pairItems / 2) * 5;
  // if (items % 2 === 0) {
  //   return 5;
  // } else {
  //   return 0;
  // }
}

module.exports = {
   mapItemsFormat,
   calculateTotalPrice, 
   getFormattedDate, 
   getFormattedTime,
   alphNumCharResults,
   calculateRoundDollarPoints,
   totalMulOfQuarter,
   forPairedItems,
  
  };
