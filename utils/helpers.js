const getFormattedDate = () => {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Zero-pad the month
    const day = String(currentDate.getDate()).padStart(2, "0"); // Zero-pad the day
    const formattedDate = year + month + day;
    return formattedDate;
  };

module.exports = getFormattedDate;
  