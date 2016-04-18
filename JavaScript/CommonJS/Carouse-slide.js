/**
 * Created by admin on 3/29/16.
 */


var carouse = (function () {
    var box = document.querySelector('.content');
    var prev = box.querySelector('.prev');
    var next = box.querySelector('.next');
    var items = box.querySelectorAll('.slides-paper');
    var current = items[0];
    var length = items.length;
    var index = 0;

    //点击上一张\下一张按钮触发事件
    function toggle(dir) {
        current.classList.remove('current');

        if (dir === 1) {
            if (index === 0) {
                index = length - 1;
            }
            else {
                index = index - 1;
            }
        }

        if (dir === -1) {
            if (index === length - 1) {
                index = 0;
            } else {
                index = index + 1;
            }

        }

        current = items[index];
        current.classList.add('current');
    }


    prev.addEventListener('click', function (ev) {
        toggle(1);
    });
    next.addEventListener('click', function (ev) {
        toggle(-1);
    });

    //每3s滚动图片
    setInterval(function () {
        current.classList.remove('current');
        if (index === length - 1) {
            index = 0;
        }
        else {
            index = index + 1;
        }

        current = items[index];
        current.classList.add('current');
    }, 3000);
})();