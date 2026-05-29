const toggleBtn = document.querySelector('#navToggle');
const navCollapse = document.querySelector('#navCollapse');

toggleBtn.addEventListener('click', () => {
    navCollapse.classList.toggle('active');
    toggleBtn.classList.toggle('active');

    const expanded = toggleBtn.getAttribute('aria-expanded') === true;
    toggleBtn.setAttribute('aria-expanded', !expanded);
});

