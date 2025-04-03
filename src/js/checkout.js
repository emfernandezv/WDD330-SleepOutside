import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
loadHeaderFooter();


function validateForm() {
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
      alert('Please fill out all required fields.');
      return false;
    }
    return true;
  }

  const Checkout = new CheckoutProcess();
  Checkout.calculateTotals();
