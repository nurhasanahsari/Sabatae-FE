/* eslint-disable no-else-return */
const greeting = () => {
  const d = new Date();
  const time = d.getHours();
  if (time < 12) {
    return 'Selamat pagi,';
  } else if (time < 18) {
    return 'Selamat siang,';
  } else {
    return 'Selamat malam,';
  }
};

export default greeting;
