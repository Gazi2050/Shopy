const productCards = document.querySelectorAll(".rounded-md.bg-white.p-2");
const productList = document.getElementById("list");
const selectedProducts = [];
let totalPrice = 0.00;
const makePurchaseButton = document.getElementById("Make Purchase");
const sell200Button = document.getElementById("SELL200");
const couponBarInput = document.getElementById("Coupon-bar");
const discountElement = document.getElementById("Discount");
const applyButton = document.getElementById("apply-btn");
const goHomeButton = document.getElementById("home");
function handleCardClick(event) {
    const productName = event.currentTarget.querySelector(".text-xl.font-semibold").textContent;
    const productPrice = parseFloat(event.currentTarget.querySelector(".text-xl.font-normal").innerText.replace(" TK", ""));
    if (!selectedProducts.includes(productName)) {
        selectedProducts.push(productName);
        updateProductList();
        totalPrice += productPrice;
        updateTotalPrice();
        updatePurchaseButtonState(totalPrice);
        updateApplyButtonState(totalPrice);
    }
}
function updateProductList() {
    productList.innerHTML = "";
    selectedProducts.forEach((productName) => {
        const listItem = document.createElement("li");
        listItem.innerText = productName;
        productList.appendChild(listItem);
    });
}
function updateTotalPrice() {
    const totalPriceElement = document.getElementById("Total price");
    totalPriceElement.innerText = totalPrice.toFixed(2);
}
function updatePurchaseButtonState(totalPrice) {
    if (totalPrice > 0) {
        makePurchaseButton.removeAttribute("disabled");
    } else {
        makePurchaseButton.setAttribute("disabled", "true");
    }
}
function updateApplyButtonState(totalPrice) {
    if (totalPrice >= 200) {
        applyButton.removeAttribute("disabled");
    } else {
        applyButton.setAttribute("disabled", "true");
    }
}
productCards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
});
sell200Button.addEventListener("click", function () {
    const couponText = sell200Button.innerText;
    couponBarInput.value = couponText;
});
applyButton.addEventListener("click", function () {
    const couponCode = couponBarInput.value;
    if (couponCode === "SELL200") {
        const discount = totalPrice * 0.2;
        discountElement.textContent = discount.toFixed(2);
        const totalElement = document.getElementById("Total price");
        const totalValue = parseFloat(totalElement.textContent);
        const totalAfterDiscount = totalValue - discount;
        const totalAfterDiscountElement = document.getElementById("Total");
        totalAfterDiscountElement.textContent = totalAfterDiscount.toFixed(2);
    } else {
        alert("Invalid coupon code. Please enter Valid coupon code to apply the discount.");
    }
});
goHomeButton.addEventListener("click", function () {
    location.reload();
});