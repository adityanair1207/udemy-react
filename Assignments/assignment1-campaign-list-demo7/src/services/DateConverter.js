import moment from "moment";

const DateConverter = (date) => {
  const mdate = moment(date).format("DD/MM/YYYY");
  return mdate;
};

export default DateConverter;
