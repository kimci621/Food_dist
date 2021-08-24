function timer() {
  // Timer
  const deadLine = '2021-09-22';
  let daysDOM = document.getElementById('days'),
    hoursDOM = document.getElementById('hours'),
    minutesDOM = document.getElementById('minutes'),
    secondsDOM = document.getElementById('seconds');

  function timeOnPage(endTime) {
    const difference = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return {
      'difference': difference,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  //insert new data to dom 
  function TimerNewData() {
    let newData = timeOnPage(deadLine);
    daysDOM.innerHTML = newData.days;
    hoursDOM.innerHTML = newData.hours;
    minutesDOM.innerHTML = newData.minutes;
    secondsDOM.innerHTML = newData.seconds;
  }
  // refresh timer
  function updateDOMTimer(whatUpdate) {
    let update = setInterval(whatUpdate, 1000);
    if (timeOnPage.difference <= 0) {
      clearInterval(update);
    }
  }

  TimerNewData();
  updateDOMTimer(TimerNewData);
}

module.exports = timer;