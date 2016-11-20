"use strict";
($ => {
    $('.btn-switch').each(el => {
        const WIDTH = 200;
        let x0, x1, left = WIDTH / 2;
        $(el).find('.slide').on('mousedown touchstart', function (e) {
            x0 = e.clientX || e.touches[0].clientX;
        }).on('mousemove touchmove', function (e) {
            if (x0) {
                x1 = e.clientX || e.touches[0].clientX;
                left += x1 -x0;
                left = Math.max(0, left);
                if (left > WIDTH / 2) {
                    left = WIDTH / 2;
                }
                this.style.left = `${left}px`;
                x0 = x1;
            }
        }).on('mouseup touchend', function (e) {
            x0 = x1 = 0;
            this.style.left = Math.floor(left / WIDTH + .75) * WIDTH / 2 + 'px';
        });
    });


})(class $ {
    static init (sele, doc) {
        return new $(sele, doc);
    }
    constructor (sele, doc) {
        this.elements = ({}).toString.call(sele).match(/^\[object\sHTML\w*Element\]$/)
            ? [sele]
            : [].filter.call(document.querySelectorAll(sele), el => !(doc && doc.contains(el)));
    }
    on (ev, fn) {
        return this.each(el => {
            ev.split(/\W+/).forEach(eve => el.addEventListener(eve, fn, false));
        });
    }
    find (sele) {
        return $.init(sele, this.elements[0]);
    }
    each (fn) {
        this.elements.forEach(fn);
        return this;
    }
}.init);