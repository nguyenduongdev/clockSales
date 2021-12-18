const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function choice() {
    const manClock = $('.manClock')
    const femanClock = $('.femanClock')
    const phuKienP = $('.phuKien')
    const man = $('.seller-product')
    const feman = $('.feman-product')
    const phuKien = $('.phuKien-product')
    manClock.onclick = function(e) {
        man.style.display = "flex"
        feman.style.display = "none"
        phuKien.style.display = "none"
        manClock.classList.add('active')
        femanClock.classList.remove('active')
        phuKienP.classList.remove('active')

    }
    femanClock.onclick = function() {
        manClock.classList.remove('active')
        femanClock.classList.add('active')
        phuKienP.classList.remove('active')
        feman.style.display = "flex"
        man.style.display = "none"
        phuKien.style.display = "none"
    }
    phuKienP.onclick = function(e) {
        phuKienP.classList.add('active')
        manClock.classList.remove('active')
        femanClock.classList.remove('active')

        phuKien.style.display = "flex"
        feman.style.display = "none"
        man.style.display = "none"
    }
}

function render(inner, j, api) {
    fetch(api)
        .then((respone) => respone.json())
        .then((clock) => {
            const html = clock.map((c, index) => {
                let sales = 0
                let minusPrice = 0
                let price1 = 0
                if (Number(c.sale) > 0) {
                    sales = `-${c.sale}%`
                    minusPrice = c.price - ((c.price * c.sale) / 100)
                    price1 = `${c.price.toLocaleString()}<u>đ</u>`
                } else {
                    sales = ''
                    minusPrice = c.price
                    price1 = ''
                }
                if (index < j) {
                    return `
                <ul class="seller-item">
                <li><img id="${api}" src="${c.img}" alt=""> </li>
                <h2 id="${index}">${c.name}</h2>
                <span class="minusPrice">${price1}</span>  <p class="money">${minusPrice.toLocaleString()}<u>đ</u></p>
                <ion-icon class="show"  name="eye-outline"></ion-icon>
                <ion-icon class="add-cart" name="cart-outline"></ion-icon>
                   <span class="sale">${sales}</span>
            </ul>
                `
                }
            });
            $(inner).innerHTML = html.join('')
            const shows = $$('.show')
            const details = $('.details')
            let i;
            Array.from(shows).forEach((show, index) => {
                let price1 = 0;
                show.onclick = function() {
                    const seller = $$('.seller-item')
                    const api = seller[index].querySelector(' img').id
                    details.style.display = 'block'
                    return fetch(api)
                        .then((respone) => respone.json())
                        .then((clock2) => {
                            showDetail(clock2, show)
                            quantity();
                            DetailImg(clock2, show)
                        })
                }
            })
        })
}
//hiện bảng thông tin sp
function showDetail(clock2, show) {
    i = Number(show.parentElement.querySelector('h2').id)
    const htmls = clock2.map((c, index) => {
        if (Number(c.sale) > 0) {
            sales = `-${c.sale}%`
            minusPrice = c.price - ((c.price * c.sale) / 100)
            price1 = `${c.price.toLocaleString()}<u>đ</u>`
        } else {
            sales = ''
            minusPrice = c.price
            price1 = ''
        }
        if (index === i) {
            return `
<div class="detail__product">
<ion-icon class="details__close" name="close-outline"></ion-icon>
<div class="detail__img">
    <div class="detail__bigImg">
        <img src="${c.img}" alt="">
    </div>
    <div class="detail__imgMini">
           
    </div>
    <div class="nextPrev">
    <ion-icon class="prev" name="chevron-back-outline"></ion-icon>
    <ion-icon class="next" name="chevron-forward-outline"></ion-icon>
    </div>
</div>
<div class="detail__text">
    <h2>${c.name}</h2>
    <span>Thương hiệu: đang cập nhật</span><span class="space">|</span>
    <span>Mã sản phẩm: Đang cập nhật</span>
    <span class="minusPrice size20 ">${price1}<u>đ</u></span>
    <p class="money size20">${minusPrice.toLocaleString()}<u>đ</u></p>
    <div class="detail__quantity">
        <span class="size13">Số lượng: </span>
        <div class="detail__s">
            <ion-icon class="minus" name="remove-outline"></ion-icon>
            <span class="num">1</span>
            <ion-icon class="plus" name="add-outline"></ion-icon>
        </div>
    </div>
    <button>Thêm vào sản phẩm</button>
</div>
</div>
`
        }

    })
    $('.details').innerHTML = htmls.join('')
}
//hiện hình ảnh phụ bên dưới
function DetailImg(clock, show) {
    let i = Number(show.parentElement.querySelector('h2').id)
    clock.map((c, index) => {
        if (index === i) {
            renderMiniImg(0, 4)
            const next = $('.next');
            const prev = $('.prev');
            let i = 0;
            let j = 4;
            next.onclick = function() {
                i++;
                j++;
                console.log(i, j);
                renderMiniImg(i, j)
            }
            prev.onclick = function() {
                i--;
                j--;
                console.log(i, j);
                renderMiniImg(i, j)
            }

            const miniImg = $$('.detail__imgMini img')
            const bigImg = $('.detail__bigImg img')
            Array.from(miniImg).forEach((m) => {
                m.onmouseover = function() {
                    if (bigImg.src != m.src) {
                        bigImg.src = m.src
                        m.classList.add('active')
                    }
                }
                m.onmouseout = function() {
                    m.classList.remove('active')
                }

            })
        }

        function renderMiniImg(i, j) {

            const html = c.imgDetail.map((c2, indexs) => {
                if (j >= c.imgDetail.length) {
                    i = 0;
                    j = 4;
                }
                console.log(c.imgDetail.length);
                if (indexs >= i && indexs < j) {
                    return `
                  <img src="${c2}" alt=""> `
                }
            })
            $('.detail__imgMini').innerHTML = html.join('')
        }
    })
}

function getTime() {

    var countDownDate = new Date("Dec 15, 2021 00:00:00").getTime();
    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        // console.log(seconds);
        // document.querySelector(".time").innerHTML = days + 'day' +
        //     hours + "h " + minutes + "m " + seconds + "s ";
        $('.time-day').innerHTML = `<span>  ${days} </span><p> Ngày</p> `
        $('.time-hour').innerHTML = `<span>  ${hours} </span><p> Giờ</p> `
        $('.time-minutes').innerHTML = `<span> ${minutes} </span><p>Phút</p>  `
        $('.time-seconds').innerHTML = `<span>  ${seconds} </span><p>Giây</p>`
            // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".time").innerHTML = "Hết thời gian";
        }
    }, 1000);
}

// function showDetail() {
//     const shows = $$('.show')
//     const close = $('.details__close')
//     const details = $('.details')
//     let i;
//     Array.from(shows).forEach((show, index) => {
//         show.onclick = function() {
//             details.style.display = 'block'
//             console.log(show.parentElement.querySelector('h2').id);
//             // quantity()
//         }
//     })
//     const close = $('.details__close')
//     close.onclick = function() {
//         details.style.display = 'none'
//     }
// }

// cộng trừ số lượng 
function quantity() {
    const minus = $('.minus')
    const plus = $('.plus')
    const num = $('.num')
    minus.onclick = function() {
        if (Number(num.innerText) > 1) {
            let so = Number(num.innerText - 1)
            num.innerText = so
        }
    }
    plus.onclick = function() {
        let so = Number(num.innerText) + 1
        num.innerText = so
    }
    const details = $('.details')
    const close = $('.details__close')
    close.onclick = function() {
        details.style.display = 'none'
    }
}


function start() {
    const ManApi = 'http://localhost:3000/product'
    const femalApi = 'http://localhost:3000/product-feman'
    const pkApi = 'http://localhost:3000/phuKien'
    getTime();
    render('.phuKien-product', 5, pkApi);
    render('.man-products', 4, ManApi);
    render('.seller-product', 8, ManApi);
    render('.feman-render', 4, femalApi);
    render('.feman-product', 8, femalApi);
    choice();
}


start();