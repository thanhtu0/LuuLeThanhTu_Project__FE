// hide loading
setTimeout(function () {
    console.log('ok');
    document.getElementById("loading").style.display = "none";
    console.log('ok');
}, 1000)

//Search cái khách hàng yêu cầu và thay đổi ở mục menubar để khách hàng chọn khỏe hơn.

function onSearch() {
    var input = document.querySelector('.search_input');
    var searchText = input.value.toLowerCase();

    var items = document.querySelectorAll('#nav li a');

    items.forEach(function (item) {
        var itemName = item.textContent.toLowerCase();
        if (itemName.includes(searchText)) {
            item.style.visibility = 'visible';
        } else {
            item.style.visibility = 'hidden';
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
}

function calculateTotalPrice() {
    var totalPrice = 0;
    cartItems.forEach(function (item) {
        totalPrice += parseFloat(item.price);
    });
    return totalPrice;
}

function updateCartForm() {
    var cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';

    cartItems.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.textContent = item.name + ' - ' + item.price + ' đ';
        cartItemsList.appendChild(listItem);
    });

    var totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = 'Tổng giá: ' + calculateTotalPrice() + ' đ';
}

function showCart() {
    var cartForm = document.getElementById('cartForm');
    if (cartForm.style.display === 'none') {
        cartForm.style.display = 'block';
    } else {
        cartForm.style.display = 'none';
    }
}

function hideCart() {
    var cartForm = document.getElementById('cartForm');
    cartForm.style.display = 'none';

    // var cartIcon = document.querySelector('.cart-icon');
    // cartIcon.style.display = 'block';
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
}

//Xác nhận thông tin trước khi gửi form 
document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn form gửi đi một cách tự động

        var confirmed = confirm('Bạn có chắc chắn muốn gửi yêu cầu này?');
        if (confirmed) {
            openModal(); // Mở modal sau khi gửi yêu cầu thành công
        }
    });
});

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







