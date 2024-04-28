
// Hàm để xóa hàng khi nhấp vào biểu tượng rác
function removeCartItem(event) {
  const rowToRemove = event.target.closest(".cart-item");
  if (rowToRemove) {
    rowToRemove.remove();
    // Cập nhật thông tin giỏ hàng trong localStorage sau khi xóa
    saveCartToLocalStorage();
  }
}

// Hàm để lưu thông tin giỏ hàng vào localStorage
function saveCartToLocalStorage() {
  const cartItems = [];
  const cartRows = document.querySelectorAll(".cart-item");
  cartRows.forEach((row) => {
    const productImage = row.querySelector("img").src;
    const productName = row.querySelector(".pro-title").innerText;
    const quantity = row.querySelector("input").value;
    const productPrice = row.querySelector(".gia").innerText;
    cartItems.push({ productImage, productName, quantity, productPrice });
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  carttotal()
  inputchange();
}

// mở cart chứa sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const shoppingCart = document.querySelector(".shopping-cart");
  const cartChild = document.querySelector(".cart_child");
  const cartTableBody = document
    .getElementById("cartTable")
    .querySelector("tbody");

  shoppingCart.addEventListener("click", function (event) {
    // Kiểm tra nếu click không phải từ biểu tượng xóa
    if (!event.target.closest(".delete-icon") && (!event.target.closest(".sl"))) {
      // Toggle lớp CSS 'show-cart' cho cart_child khi click vào shopping-cart
      cartChild.classList.toggle("show-cart");
    }
  });


  /* Hiển thị giỏ hàng từ localStorage khi trang được tải lại */
  function displayCartFromLocalStorage() {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Xóa toàn bộ nội dung trong tbody trước khi thêm mới
    cartTableBody.innerHTML = "";

    if (savedCartItems.length > 0) {
      for (const cartItem of savedCartItems) {
        const newRowHTML = `
                    <tr class="cart-item">
                        <td class="anh-sp">
                            <img src="${cartItem.productImage}" alt="">
                            <p class="pro-title">${cartItem.productName}</p>
                        </td>
                        <td class="sl">
                            <input style="height: 40px; width: 100px;" type="number" value="${cartItem.quantity}" min="1">
                        </td>
                        <td class="gia">
                          <p style="height: 40px; width: 100px;">${cartItem.productPrice}</p>
                        </td>
                        <td class="remove">
                            <i class='bx bx-trash delete-icon'></i>
                        </td>
                    </tr>
                `;
        cartTableBody.insertAdjacentHTML("beforeend", newRowHTML);
      }

      // Thêm sự kiện click cho nút xóa mới
      const deleteIcons = document.querySelectorAll(".delete-icon");
      deleteIcons.forEach((icon) => {
        icon.addEventListener("click", removeCartItem);
      });
      carttotal();
      inputchange();
    }
  }

  // Gọi hàm hiển thị giỏ hàng từ localStorage khi trang được tải lại
  displayCartFromLocalStorage();
});

// Thêm vào giỏ hàng
// document.addEventListener("DOMContentLoaded", function () {
const btn = document.querySelectorAll(".addToCartBtn");
const cartTableBody = document
  .getElementById("cartTable")
  .querySelector("tbody");
btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    const btnItem = event.target;
    const product = btnItem.parentElement.parentElement;
    const productName = product.querySelector(".card_title").innerText;
    const productImage = product.querySelector(".anh").src;
    const productP =product.querySelector('span').innerText;
    const productPrice=parseInt(productP.replace(/\./g, ""));
    const quantity = 1;
    var cartItem = JSON.parse(localStorage.getItem('cartItems'));
    for(var i = 0; i < cartItem.length; i++) {
      var productT = cartItem[i].productName
      if (productT==productName) {
        alert("Sản phẩm của bạn đã có trong giỏ hàng")
        return
      }
    }
    console.log("Sản phẩm được thêm vào giỏ hàng:");
    console.log("Tên sản phẩm:", productName);
    console.log("Ảnh sản phẩm:", productImage);
    console.log("Số lượng:", quantity);
    console.log("Giá tiền:", productPrice);
    // Tạo HTML mới cho hàng giỏ hàng
    const newRowHTML = `
            <tr class="cart-item">
                <td class="anh-sp">
                    <img src="${productImage}" alt="">
                    <p class="pro-title">${productName}</p>
                </td>
                <td class="sl">
                    <input style="height: 40px; width: 100px;" type="number" value="${quantity}" min="1">
                </td>
                <td class="gia">
                    <p style="height: 40px; width: 100px;">${productPrice}</p>
                </td>
                <td class="remove">
                    <i class='bx bx-trash delete-icon'></i>
                </td>
            </tr>

        `;

    // Thêm HTML mới vào tbody của bảng giỏ hàng
    cartTableBody.insertAdjacentHTML("beforeend", newRowHTML);


    // Lưu thông tin giỏ hàng vào localStorage
    saveCartToLocalStorage();
    // carttotal();
    // Thêm sự kiện click cho nút xóa mới
    const deleteIcons = document.querySelectorAll(".delete-icon");
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", removeCartItem);
    });
  });

})

function carttotal() {
  var cartItem = JSON.parse(localStorage.getItem('cartItems'));
  var totalC = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].quantity
    var productPrice = parseInt(cartItem[i].productPrice)
    // console.log(inputValue)
    // console.log(productPrice)
    totalA = inputValue * productPrice
    totalC = totalC + totalA
    totalD = totalC.toLocaleString(`de-DE`)
  }
  var cartTotalA = document.querySelector(".cart-total-price")
  if (cartItem.length == 0) {
    totalD = 0
  }
  cartTotalA.innerHTML = totalD
}
function inputchange(){
  var cartItem=JSON.parse(localStorage.getItem('cartItems'));
  var inputPo=document.querySelectorAll('tbody tr')
  for(var i=0;i<inputPo.length;i++)
  var inputValue=inputPo[i].querySelector('input')
  inputValue.addEventListener("change",function(){
    const parentInput=inputValue.parentElement.parentElement
    const productname=parentInput.querySelector(".pro-title").innerText
    for(var i=0;i<cartItem.length;i++){
      if(cartItem[i].productName==productname){
        saveCartToLocalStorage();
      }
    }
  })
}
// });

// Gọi hàm hiển thị giỏ hàng từ localStorage khi window được load
window.onload = function () {
  displayCartFromLocalStorage();
};


//slide ảnh
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
//gọi ngay
document
  .querySelector(".goingay")
  .addEventListener("mouseover", function () {
    document.querySelector(".hdphone").style.display = "flex";
  });
document
  .querySelector(".goingay")
  .addEventListener("mouseout", function () {
    document.querySelector(".hdphone").style.display = "none";
  });