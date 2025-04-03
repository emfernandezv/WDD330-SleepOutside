export default class CheckoutProcess {
    calculateTotals() {
        const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item['Result'].FinalPrice * item.quantity;
        });

        const tax = subtotal * 0.06;
        const shipping = cart.length > 0 ? 10 + (cart.length - 1) * 2 : 0;
        const total = subtotal + tax + shipping;

        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `${tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `${shipping.toFixed(2)}`;
        document.getElementById('orderTotal').textContent = `${total.toFixed(2)}`;
    }
}
