// Interaktivitas setelah DOM dimuat
document.addEventListener('DOMContentLoaded', function () {
  const ctaButton = document.getElementById('cta-button');

  // Efek tombol utama
  if (ctaButton) {
    ctaButton.addEventListener('click', function () {
      alert('Terima kasih telah memilih Dapoer Bebek!\nKami siap menyajikan hidangan terbaik untuk Anda.');
    });
  }

  // Scroll-Spy untuk navigasi aktif
  const navLinks = document.querySelectorAll('header nav ul li a');
  const sections = document.querySelectorAll('main section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.href.includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll saat klik navigasi
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  });
});
// Keranjang sederhana
const cart = {};
const cartItemsList = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');

function renderCart() {
  cartItemsList.innerHTML = '';
  const items = Object.entries(cart); // [ [name, qty], ... ]

  if (items.length === 0) {
    cartItemsList.innerHTML = '<li>Keranjang kosong</li>';
    clearCartBtn.style.display = 'none';
    return;
  }

  clearCartBtn.style.display = 'inline-block';

  items.forEach(([name, qty]) => {
    const li = document.createElement('li');
    li.textContent = `${name} (x${qty})`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Hapus';
    removeBtn.classList.add('cart-remove-btn');
    removeBtn.addEventListener('click', () => {
      if (qty === 1) {
        delete cart[name];
      } else {
        cart[name] = qty - 1;
      }
      renderCart();
    });

    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });
}

// Tambah item ke keranjang saat klik menu
const menuItems = document.querySelectorAll('.feature-item.clickable');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.getAttribute('data-name');
    if (cart[name]) {
      cart[name]++;
    } else {
      cart[name] = 1;
    }
    renderCart();
  });
});

// Bersihkan keranjang
clearCartBtn.addEventListener('click', () => {
  for (const key in cart) {
    delete cart[key];
  }
  renderCart();
});

// Render awal
renderCart();

document.getElementById('search-input').addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const items = document.querySelectorAll('#menu-list .feature-item');
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if(text.includes(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});

