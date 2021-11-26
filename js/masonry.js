// import imagesLoaded from 'imagesloaded';

function resizeGridItems(){
    const items = document.querySelectorAll('.grid-item')
    items.forEach(item=>{
        imagesLoaded(item,(instance)=>{
            const item = instance.elements[0];
            const grid = document.querySelector('.grid-container')
            const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
            const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
            const rowSpan =  Math.floor((item.querySelector('.content').offsetHeight+rowGap)/(rowHeight+rowGap))
            item.style.gridRowEnd = "span "+ rowSpan;
        });
    });
    const gallery = document.querySelector('.grid-container')
    imagesLoaded(gallery,()=>{
        document.querySelectorAll('.grid-item').forEach(item=> item.style.visibility = 'visible')
    });
}

window.addEventListener('load', resizeGridItems);
window.addEventListener('resize', resizeGridItems);