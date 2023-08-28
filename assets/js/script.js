//Ẩn phần loading và hiển thị trang bán hàng.
setTimeout(function () {
    console.log('ok');
    document.getElementById("loading").style.display = "none";
    console.log('ok');
}, 1000)

//Tìm kiến khách hàng yêu cầu và thay đổi ở mục menubar để khách hàng chọn.

function onSearch() {
    var input = document.querySelector('.search_input');
    var searchText = input.value.toLowerCase();

    var items = document.querySelectorAll('#nav li');

    items.forEach(function (item) {
        var itemName = item.textContent.toLowerCase();
        var subnav = item.querySelector('.subnav');

        if (itemName.includes(searchText) || (subnav && Array.from(subnav.querySelectorAll('li')).some(function (subitem) {
            return subitem.textContent.toLowerCase().includes(searchText);
        }))) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
// Em sẽ sử dụng JavaScript để khi khách hàng nhấn mua ngay thì giỏ hàng sẽ xuất hiện và tăng giá trị sản phẩm lên
// Sau đó, khi ấn lại vào giỏ hàng, thì sẽ xuất hiện form giỏ hàng và khách hàng điền thông tin để thanh toán.
var cartItems = [];

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    updateCartIcon();
    updateCartForm();
}

function updateCartIcon() {
    var cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cartItems.length;
    cartCountElement.style.display = 'inline';

    if (cartItems.length > 0) {
        cartCountElement.classList.add('shake');
        setTimeout(function () {
            cartCountElement.classList.remove('shake');
        }, 500); 
    }
}

function updateCartForm() {
    var cartItemsList = document.getElementById('cartItems');
    var totalPriceElement = document.getElementById('totalPrice');
    var total = calculateTotalPrice();

    cartItemsList.innerHTML = '';
    cartItems.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.name + ' - ' + item.price + ' đ';
        cartItemsList.appendChild(listItem);
    });

    totalPriceElement.textContent = 'Tổng giá: ' + total + ' đ';
}

function calculateTotalPrice() {
    var totalPrice = 0;
    cartItems.forEach(function (item) {
        totalPrice += parseFloat(item.price);
    });
    return totalPrice;
}

function showCart() {
    var cartForm = document.getElementById('cartForm');
    if (cartForm.style.display === 'none') {
        cartForm.style.display = 'block';
        updateCartForm();
    } else {
        cartForm.style.display = 'none';
    }
}

function hideCart() {
    var cartForm = document.getElementById('cartForm');
    cartForm.style.display = 'none';
}

function placeOrder() {
    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var address = document.getElementById('address').value;
    var totalPrice = calculateTotalPrice();

    alert('Cảm ơn ' + name + ' đã mua hàng!\nTổng số tiền: ' + totalPrice.toLocaleString('vi-VN') + ' đ');
    cartItems = [];
    updateCartIcon();
    updateCartForm();
    openModal();
}

//Hiển thị cảm ơn khách hàng.
function openModal() {
    var modal = document.getElementById('successModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('successModal');
    var overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

addFormSubmidEvent();
//Xác nhận thông tin trước khi gửi form 
async function addFormSubmidEvent() {
    await fetch('./components/contact-form.html')
        .then(response => response.text())
        .then(data => document.getElementById('contact-form').innerHTML = data);
    document.querySelectorAll('form').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn form gửi đi một cách tự động
            var confirmed = confirm('Bạn có chắc chắn muốn gửi yêu cầu này?');
            if (confirmed) {
                openModal(); // Mở modal sau khi gửi yêu cầu thành công
            }
        });
    });
}








