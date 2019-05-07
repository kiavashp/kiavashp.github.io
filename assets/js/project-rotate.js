'use strict';

window.projectRotate = (() => {
    const attribute = 'data-image-index';
    return (entry, project) => {
        const image = entry.querySelector('img');
        const dots = entry.querySelectorAll('.entry-nav > .entry-nav-dot');
        const images = project.images;
        let index = parseInt(entry.getAttribute(attribute)) || 0;

        if (index >= images.length - 1) {
            index = 0;
        } else {
            index += 1;
        }

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        image.src = `/assets/${project.images[index]}`;

        entry.setAttribute(attribute, index);
    };
})();
