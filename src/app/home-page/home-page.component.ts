import { Component, OnInit } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  slideIndex: number = 1;
  timer: any;
  cartItems: CartItem[] = [];
  cartIsEmpty = true;

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.slideIndex++;
    if (this.slideIndex > 7) {
      this.slideIndex = 1;
    }
  }

  currentSlide(event: Event, index: number) {
    clearInterval(this.timer);
    this.slideIndex = index;
    this.startSlider();
  }

  addToCart(event: Event) {
    const productCard = (event.target as HTMLElement).closest('.product-card');
    const productName = productCard?.querySelector('h3')?.textContent;
    const productPriceString = productCard?.querySelector('p')?.textContent?.replace('$', '');
    const productImage = productCard?.querySelector('img')?.getAttribute('src');

    if (productName && productPriceString && productImage) {
      const productPrice = parseFloat(productPriceString);
      const existingItem = this.cartItems.find(item => item.name === productName);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }

      this.updateCartDisplay();
      this.checkCartIsEmpty();

      const quantityElement = productCard?.querySelector('.quantity');
      if (quantityElement) {
        const quantity = parseInt(quantityElement.textContent || '0');
        quantityElement.textContent = (quantity + 1).toString();
      }
    }
  }

  removeFromCart(event: Event | undefined, itemName: string) {
    if (event) {
      const existingItemIndex = this.cartItems.findIndex(item => item.name === itemName);
      if (existingItemIndex !== -1) {
        this.cartItems.splice(existingItemIndex, 1);
      }

      this.updateCartDisplay();
      this.checkCartIsEmpty();
    }
  }

  incrementQuantity(event: Event) {
    const productCard = (event.target as HTMLElement).closest('.product-card');
    const productName = productCard?.querySelector('h3')?.textContent;

    if (productName) {
      const existingItem = this.cartItems.find(item => item.name === productName);
      if (existingItem) {
        existingItem.quantity++;

        const quantityElement = productCard?.querySelector('.quantity');
        if (quantityElement) {
          const quantity = parseInt(quantityElement.textContent || '0');
          quantityElement.textContent = (quantity + 1).toString();
        }
      }
    }
  }

  decrementQuantity(event: Event) {
    const productCard = (event.target as HTMLElement).closest('.product-card');
    const productName = productCard?.querySelector('h3')?.textContent;

    if (productName) {
      const existingItem = this.cartItems.find(item => item.name === productName);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;

        const quantityElement = productCard?.querySelector('.quantity');
        if (quantityElement) {
          const quantity = parseInt(quantityElement.textContent || '0');
          if (quantity > 0) {
            quantityElement.textContent = (quantity - 1).toString();
          }
        }
      }
    }
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';

      this.cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        itemDetails.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        itemDetails.appendChild(itemPrice);

        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = `Quantity: ${item.quantity}`;
        itemDetails.appendChild(itemQuantity);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-from-cart-btn');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => this.removeFromCart(event, item.name));
        itemDetails.appendChild(removeButton);

        cartItem.appendChild(itemDetails);
        cartItemsContainer.appendChild(cartItem);
      });
    }
  }

  checkCartIsEmpty() {
    this.cartIsEmpty = this.cartItems.length === 0;
  }

  openCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  topFunction() {
    document.documentElement.scrollTop = 0;
  }
}