document.addEventListener('DOMContentLoaded', function() {
  let counter = 0;
  let timer = setInterval(incrementCounter, 1000);
  let likes = {}; // Object to store likes for each number

  const counterDisplay = document.getElementById('counter');
  const plusButton = document.getElementById('plus');
  const minusButton = document.getElementById('minus');
  const heartButton = document.getElementById('heart');
  const pauseButton = document.getElementById('pause');
  const resumeButton = document.createElement('button');
  resumeButton.innerText = 'resume';
  resumeButton.id = 'resume';

  plusButton.addEventListener('click', incrementCounter);
  minusButton.addEventListener('click', decrementCounter);
  heartButton.addEventListener('click', likeCounter);
  pauseButton.addEventListener('click', pauseCounter);

  function incrementCounter() {
    counter++;
    counterDisplay.textContent = counter;
  }

  function decrementCounter() {
    counter--;
    counterDisplay.textContent = counter;
  }

  function likeCounter() {
    if (!likes[counter]) {
      likes[counter] = 0;
    }
    likes[counter]++;
    updateLikesDisplay();
  }

  function updateLikesDisplay() {
    const likesList = document.querySelector('.likes');
    likesList.innerHTML = '';
    for (let number in likes) {
      const li = document.createElement('li');
      li.textContent = `${number} has been liked ${likes[number]} times`;
      likesList.appendChild(li);
    }
  }

  function pauseCounter() {
    clearInterval(timer);
    disableButtons();
    pauseButton.innerText = 'resume';
    pauseButton.removeEventListener('click', pauseCounter);
    pauseButton.addEventListener('click', resumeCounter);
  }

  function resumeCounter() {
    timer = setInterval(incrementCounter, 1000);
    enableButtons();
    pauseButton.innerText = 'pause';
    pauseButton.removeEventListener('click', resumeCounter);
    pauseButton.addEventListener('click', pauseCounter);
  }

  function disableButtons() {
    plusButton.disabled = true;
    minusButton.disabled = true;
    heartButton.disabled = true;
    document.getElementById('submit').disabled = true;
  }

  function enableButtons() {
    plusButton.disabled = false;
    minusButton.disabled = false;
    heartButton.disabled = false;
    document.getElementById('submit').disabled = false;
  }

  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('list');

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value;
    const commentItem = document.createElement('div');
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
    commentInput.value = '';
  });
});
