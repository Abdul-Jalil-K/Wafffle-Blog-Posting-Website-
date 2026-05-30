const toggleBtn = document.querySelector('#navToggle');
const navCollapse = document.querySelector('#navCollapse');

toggleBtn.addEventListener('click', () => {
    navCollapse.classList.toggle('active');
    toggleBtn.classList.toggle('active');

    const expanded = toggleBtn.getAttribute('aria-expanded') === true;
    toggleBtn.setAttribute('aria-expanded', !expanded);
});

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.date-container');

    setInterval(() => {
        containers.forEach(container => {
            const gregDate = container.querySelector('.Gregorian-date');
            const hijriDate = container.querySelector('.Hijri-date');

            gregDate.classList.toggle('hidden');
            hijriDate.classList.toggle('hidden');
        });
    }, 60000);
})

