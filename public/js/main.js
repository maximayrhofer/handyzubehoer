document.addEventListener('DOMContentLoaded', () => {
  const phone = document.getElementById('hero-phone');
  phone.addEventListener('error', () => {
    phone.src = 'assets/placeholder.png';
  });
});
