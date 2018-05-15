;(function () {
    const $app = document.querySelector('.app');
    const $page = document.querySelector('.page');
    const $list = document.querySelector('.infinite');
    let startY = 0;
    let endY = 0;

    let startX = 0;
    let nowX = 0;
    $page.addEventListener('touchstart', function (evt) {
        console.log('touchstart', evt);
        startX = evt.changedTouches[0].pageX;
        startY = evt.changedTouches[0].pageY;
    });


    $page.addEventListener('touchmove', function (evt) {
        // console.log('touchmove', evt);

        nowX = evt.changedTouches[0].pageX;
        $page.style.transform =  'translate('+(nowX-startX)+'px,0)';
    });
    const swapUpEvent = document.createEvent('HTMLEvents');
    swapUpEvent.initEvent('swap-up', false, false);

    $page.addEventListener('touchend', function (evt) {
        endY = evt.changedTouches[0].pageY;
        if (endY < startY) {
            $page.dispatchEvent(swapUpEvent);
            startY = 0;
            endY = 0;
        }
    });

    $page.addEventListener('swap-up', function (evt) {
        console.log('向上');
    });


    let preScrollTop = 0;
    $app.addEventListener('scroll', function () {
        let wrapHeight = $app.clientHeight;
        let wrapScrollTop = $app.scrollTop;
        let innerHeight = $page.clientHeight;
        if (preScrollTop < $app.scrollTop) {
            if (wrapScrollTop + wrapHeight >= innerHeight) {
                console.log('加载更多...');
                loadMore();
            }
        }
        preScrollTop = wrapScrollTop;
    });

    const $fragment = document.createDocumentFragment();

    let itemCount = 11;

    function loadMore() {
        for (let i = 0; i < 10; i++) {
            let $li = document.createElement('li');
            $li.className = 'item';
            $li.innerHTML = '<span>' + itemCount + '</span>';
            $fragment.appendChild($li);
            itemCount++;
        }
        $list.appendChild($fragment);
    }
})();