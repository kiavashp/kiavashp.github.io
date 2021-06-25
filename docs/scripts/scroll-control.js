document.addEventListener('DOMContentLoaded', function () {
    const scrollProgressElement = document.querySelector('nav:not(.noscroll) > .scroll-progress');
    const footer = document.querySelector('footer');
    const debounceScroll = (fn) => {
        let frame;
        let lastreturn;
        return (...params) => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => lastreturn = fn(lastreturn, ...params));
        }
    };

    const isScrolled = (wasScrolled) => {
        let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        let viewHeight = window.visualViewport.height;

        if (scrollHeight - viewHeight < 1000) {
            return false;
        }

        if (scrollTop > 0 /*400*/) {
            if (!wasScrolled) {
                document.body.classList.add('scrolled');
                wasScrolled = true;
            }
        } else if (wasScrolled && scrollTop < 20) {
            document.body.classList.remove('scrolled');
            wasScrolled = false;
        }

        return wasScrolled;
    }

    const scrollProgress = () => {
        let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        let scrollPercentDecimal = (scrollTop / (scrollHeight - clientHeight - footer.clientHeight)) * 100;
        let scrollPercent = Math.max(0, Math.min(scrollPercentDecimal, 100));

        scrollProgressElement.style.width = `${scrollPercent}%`;
    };

    if (!scrollProgressElement) {
        console.log('noscroll');
        return;
    }

    document.addEventListener('scroll', debounceScroll(isScrolled), { passive: true });

    document.addEventListener('scroll', debounceScroll(scrollProgress), { passive: true });
    window.addEventListener('resize', debounceScroll(scrollProgress), { passive: true });

    scrollProgress();
    isScrolled();
});
