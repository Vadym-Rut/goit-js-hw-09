import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit)





//----------------------------------------------------------------------//
function onSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(refs.form.elements.delay.value);
  const delayStep = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);
   
  if (amount <= 0) return;

  for (let i = 1; i <= amount; i += 1) {    
    createPromise(i, firstDelay)
      .then(({ pos, del }) => {
        Notify.success(`Fulfilled ${pos} promise ${del}ms`);
        console.log(`Fulfilled ${pos} promise ${del}ms`);
      })
      .catch(({ pos, del }) => {
        Notify.failure(`Rejected ${pos} promise ${del}ms`);
        console.log(`Rejected ${pos} promise ${del}ms`);
      });
    
    firstDelay += delayStep;
  }
}


function createPromise(pos, del) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({pos, del});
      } else {
          reject({pos, del});
        }
    }, del);
  });
  
}
