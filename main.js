const btn1 = document.querySelector('.btn1');
const wrapper = document.querySelector('.wrapper');

const closeBtn = document.querySelector('.btn-close');

const checkboxYear = document.querySelector(".checkbox_year");
const checkboxWeek = document.querySelector(".checkbox_week");
const checkboxMonth = document.querySelector(".checkbox_month");

const btnSub = document.querySelector('.btn-sub');
const btnTerms = document.querySelector('.terms');
const btnPolicy = document.querySelector('.policy');
const btnOption = document.querySelector('.see-options');

let checked_plan = '';

btn1.addEventListener('click', () => {
  wrapper.classList.add('start-anim');

  webkit.messageHandlers.unityControl.postMessage({
    'action': 'gdpr-accept'
  });
});

checkboxMonth.addEventListener('click', () => {
  checked_plan = 'month';

  checkboxMonth.classList.add('checked');
  checkboxYear.classList.remove('checked');
  checkboxWeek.classList.remove('checked');
});

checkboxYear.addEventListener('click', () => {
  checked_plan = 'year';

  checkboxYear.classList.add('checked');
  checkboxMonth.classList.remove('checked');
  checkboxWeek.classList.remove('checked');
});

checkboxWeek.addEventListener('click', () => {
  checked_plan = 'week';

  checkboxYear.classList.remove('checked');
  checkboxMonth.classList.remove('checked');
  checkboxWeek.classList.add('checked');
});

btnSub.addEventListener('click', () => {
  if (checked_plan === 'week') {
    webkit.messageHandlers.unityControl.postMessage({
      'action': 'subscribe_week'
    });
  } else if (checked_plan === 'month') {
    webkit.messageHandlers.unityControl.postMessage({
      'action': 'subscribe_month'
    });
  } else {
    webkit.messageHandlers.unityControl.postMessage({
      'action': 'subscribe_year'
    });
  };
});

closeBtn.addEventListener('click', () => {
  webkit.messageHandlers.unityControl.postMessage({
    'action': 'close'
  });
});

btnTerms.addEventListener('click', () => {
  console.log('terms');
  webkit.messageHandlers.unityControl.postMessage({
    'action': 'terms'
  });
});

btnPolicy.addEventListener('click', () => {
  console.log('privacy');
  webkit.messageHandlers.unityControl.postMessage({
    'action': 'privacy'
  });
});

btnOption.addEventListener('click', () => {
  console.log('see-the-options');
  webkit.messageHandlers.unityControl.postMessage({
    'action': 'see-the-options'
  });
});

window.addEventListener('message', message => {
  const month_price = document.querySelector('.month_price');
  const year_price = document.querySelector('.year_price');
  const week_price = document.querySelector('.week_price');
  const data = JSON.parse(message.data);

  if (data.type === "all_prices") {
    data.allPrices.forEach(item => {
      switch (item.type) {
        case "month":
          month_price.textContent = item.price;
          break;
        case "year":
          year_price.textContent = item.price;
          break;
        case "week":
          week_price.textContent = item.price;
          break;
      }
    })
  }
});