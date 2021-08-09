function findScroll (elem) {
    elem.onscroll = function () {
        console.log(elem);
    }
    elem.from(elem.chrildrem).forEach(findScroll);
}
findScroll(document.body)