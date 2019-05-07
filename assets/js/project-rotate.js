'use strict';

window.projectRotate = (() => {
    const attribute = 'data-image-index';
    return (entry, project) => {
        const image = entry.querySelector('img');
        const images = project.images;
        let index = parseInt(entry.getAttribute(attribute)) || 0;

        if (index >= images.length - 1) {
            index = 0;
        } else {
            index += 1;
        }

        image.src = `/assets/${project.images[index]}`;

        entry.setAttribute(attribute, index);
    };
})();
