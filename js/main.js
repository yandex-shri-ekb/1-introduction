function resize () {
    var scale = 88,
        rootFontSize = Math.floor(document.body.offsetWidth / scale);
    document.getElementsByTagName('html')[0].style.fontSize = rootFontSize + 'px';
}

window.onresize = resize;
resize();