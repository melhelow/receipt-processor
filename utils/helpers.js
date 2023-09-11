

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

module.exports = { mapItemsFormat,calculateTotalPrice, getFormattedDate, getFormattedTime };
