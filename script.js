const form = document.getElementById('birthday-form');
const birthdayInput = document.getElementById('birthday');
const output = document.getElementById('output');

let timer = null;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  output.classList.remove('hidden');
  if (timer) clearInterval(timer);

  const birthdayValue = birthdayInput.value;
  if (!birthdayValue) return;

  const today = new Date();
  const [year, month, day] = birthdayValue.split('-').map(Number);

  // Create a birthday date for this year
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  // If birthday this year has passed, set to next year
  if (
    today.getMonth() > nextBirthday.getMonth() ||
    (today.getMonth() === nextBirthday.getMonth() && today.getDate() > nextBirthday.getDate())
  ) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }

  // Check if today is the birthday
  if (
    today.getMonth() === (month - 1) &&
    today.getDate() === day
  ) {
    showBirthdayWish();
  } else {
    showCountdown(nextBirthday);
    timer = setInterval(() => showCountdown(nextBirthday), 1000);
  }
});

function showBirthdayWish() {
  output.innerHTML = `
    <div class="birthday-wish">
      🎉 Happy Birthday! 🎉<br>
      Wishing you a fantastic year ahead!<br>
      <span style="font-size:2.5rem;">🥳🎂🎁</span>
    </div>
  `;
}

function showCountdown(nextBirthday) {
  const now = new Date();
  const diff = nextBirthday - now;

  if (diff <= 0) {
    showBirthdayWish();
    if (timer) clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  output.innerHTML = `
    <div>
      <strong>Your birthday is coming up in:</strong>
      <div id="countdown">
        <div><span>${days.toString().padStart(2, '0')}</span><span>Days</span></div>
        <div><span>${hours.toString().padStart(2, '0')}</span><span>Hours</span></div>
        <div><span>${minutes.toString().padStart(2, '0')}</span><span>Minutes</span></div>
        <div><span>${seconds.toString().padStart(2, '0')}</span><span>Seconds</span></div>
      </div>
    </div>
  `;
}