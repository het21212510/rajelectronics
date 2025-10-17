// store.js — simple static store for RajElectronics prototype
// Responsibilities: load products.json, render product grid, product detail, and cart actions (localStorage)

const STORE_KEY = 're_cart_v1';

// Embedded products data to remove any runtime fetch/backend dependency.
// LocalStorage override ('re_products_v1') is still supported for dev/admin changes.
const PRODUCTS = [
  {
    "id": "tv-55-4k",
    "title": "55\" 4K Smart LED TV",
    "category": "TV",
    "brand": "CrystalVision",
    "price": 34999,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
      "https://images.unsplash.com/photo-1587202372775-48fbf5b0f3a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3"
    ],
    "rating": 4.6,
    "specs": {"size":"55 inch","resolution":"4K","smart":"Yes"},
    "stock": 12,
    "features": ["HDR","Dolby Audio","Android TV"]
  },
  {
    "id": "tv-65-oled",
    "title": "65\" OLED Smart TV",
    "category": "TV",
    "brand": "Visionary",
    "price": 89999,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b3e4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6"
    ],
    "rating": 4.8,
    "specs": {"size":"65 inch","resolution":"4K OLED","smart":"Yes"},
    "stock": 6,
    "features": ["OLED","Perfect Blacks","Voice Assistant"]
  },
  {
    "id": "fridge-300l",
    "title": "300L Frost Free Refrigerator",
    "category": "Fridge",
    "brand": "FrostPro",
    "price": 24999,
    "images": [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7",
      "https://images.unsplash.com/photo-1586201375759-91b9b7d4f6c6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9"
    ],
    "rating": 4.3,
    "specs": {"capacity":"300 L","type":"Frost Free","energy":"3 Star"},
    "stock": 8,
    "features": ["Stabilizer Free","Low Noise"]
  },
  {
    "id": "fridge-500l",
    "title": "500L Side-by-Side Refrigerator",
    "category": "Fridge",
    "brand": "CoolHouse",
    "price": 55999,
    "images": [
      "https://images.unsplash.com/photo-1582719478179-8b2f3b6f7b9a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=10",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=11",
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=12"
    ],
    "rating": 4.5,
    "specs": {"capacity":"500 L","type":"Side-by-Side","energy":"4 Star"},
    "stock": 4,
    "features": ["Water Dispenser","Inverter Compressor"]
  },
  {
    "id": "ac-1.5t",
    "title": "1.5 Ton Inverter AC",
    "category": "AC",
    "brand": "AirMax",
    "price": 27999,
    "images": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=13",
      "https://images.unsplash.com/photo-1582719478179-8b2f3b6f7b9a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=14",
      "https://images.unsplash.com/photo-1598300054072-8c4f3a6b1d2e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=15"
    ],
    "rating": 4.1,
    "specs": {"capacity":"1.5 Ton","type":"Inverter","btu":"18000"},
    "stock": 15,
    "features": ["Eco Mode","Sleep Mode"]
  },
  {
    "id": "wm-7kg",
    "title": "7kg Front Load Washing Machine",
    "category": "Washing Machine",
    "brand": "SpinTech",
    "price": 18999,
    "images": [
      "https://images.unsplash.com/photo-1519741490-7de6f7ecf3b3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=16",
      "https://images.unsplash.com/photo-1581579182060-b1f2c3d4e5f6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=17",
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=18"
    ],
    "rating": 4.0,
    "specs": {"capacity":"7 kg","type":"Front Load","rpm":"1200"},
    "stock": 10,
    "features": ["Quick Wash","Child Lock"]
  },
  {
    "id": "speaker-1",
    "title": "Bluetooth Party Speaker",
    "category": "Speakers",
    "brand": "BoomBox",
    "price": 4999,
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a415522b3b9f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=19",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=20",
      "https://images.unsplash.com/photo-1518446154603-5fbc6f265f6b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=21"
    ],
    "rating": 4.4,
    "specs": {"power":"40W","wireless":"Bluetooth"},
    "stock": 25,
    "features": ["USB","LED Lights","TWS Pairing"]
  },
  {
    "id": "laptop-14",
    "title": "14\" Ultralight Laptop",
    "category": "Laptops",
    "brand": "NoteAir",
    "price": 65999,
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=22",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=23",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=24"
    ],
    "rating": 4.5,
    "specs": {"screen":"14 inch","cpu":"i5","ram":"8GB"},
    "stock": 7,
    "features": ["Fingerprint","Backlit Keyboard"]
  }
];

async function fetchProducts(){
  // Return a deep copy so callers can't accidentally mutate the canonical PRODUCTS array
  return JSON.parse(JSON.stringify(PRODUCTS));
}

// Prefer products saved in localStorage (admin override) for the prototype
async function getProducts(){
  try{
    const raw = localStorage.getItem('re_products_v1');
    if(raw){ return JSON.parse(raw); }
  }catch(e){ /* ignore */ }
  return await fetchProducts();
}

function formatPrice(v){
  return '₹' + v.toLocaleString('en-IN');
}

function escapeHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// CART helpers
function loadCart(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); }catch(e){ return {}; }
}
function saveCart(cart){ localStorage.setItem(STORE_KEY, JSON.stringify(cart)); }
function addToCart(id, qty=1){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}
function removeFromCart(id){
  const cart = loadCart();
  delete cart[id];
  saveCart(cart);
}
function updateCartItem(id, qty){
  const cart = loadCart();
  if(qty <= 0) delete cart[id]; else cart[id] = qty;
  saveCart(cart);
}

// Render catalog
async function renderCatalog(containerId='catalog', controlsId){
  const products = await getProducts();
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  // allow initial search from ?q= param (navbar search)
  const params = new URLSearchParams(location.search);
  const initialQ = (params.get('q') || '').trim().toLowerCase();

  const grid = document.createElement('div');
  grid.className = 'product-grid';
  // choose initial list (filtered if q present)
  const listToRender = initialQ ? products.filter(p => ((p.title + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(initialQ))) : products;
  listToRender.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="thumb"><img src="${p.images[0]}" loading="lazy" alt="${p.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/640x360?text=No+Image'"/></a>
      <div class="meta">
        <a href="product.html?id=${p.id}" class="title">${p.title}</a>
        <div class="brand">${p.brand}</div>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
      <div class="actions">
        <button class="btn small add" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);

  // bind add buttons
  container.querySelectorAll('.add').forEach(b=> b.addEventListener('click', (e)=>{
    addToCart(b.dataset.id, 1);
    if(window.showToast) showToast('Added to cart', 'success'); else alert('Added to cart');
  }));

  // If controlsId provided, render filters + search
  if(controlsId){
    const controls = document.getElementById(controlsId);
    if(controls){
      controls.innerHTML = '';
      // search box
      const search = document.createElement('input');
      search.type = 'search';
      search.placeholder = 'Search products...';
      search.className = 'catalog-search';
      // category select
      const cats = Array.from(new Set(products.map(p=>p.category)));
      const catSel = document.createElement('select');
      catSel.innerHTML = `<option value="">All categories</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
      // brand select
      const brands = Array.from(new Set(products.map(p=>p.brand)));
      const brandSel = document.createElement('select');
      brandSel.innerHTML = `<option value="">All brands</option>` + brands.map(b=>`<option value="${b}">${b}</option>`).join('');
      // price range simple
      const priceMin = document.createElement('input'); priceMin.type='number'; priceMin.placeholder='Min price'; priceMin.className='small';
      const priceMax = document.createElement('input'); priceMax.type='number'; priceMax.placeholder='Max price'; priceMax.className='small';
      const wrap = document.createElement('div'); wrap.className='catalog-controls';
      wrap.append(search, catSel, brandSel, priceMin, priceMax);
      controls.appendChild(wrap);

  // if the page was opened with ?q=, prefill search and apply filters
  if(initialQ){ search.value = initialQ; }

      function applyFilters(){
        const q = search.value.trim().toLowerCase();
        const cat = catSel.value;
        const brand = brandSel.value;
        const min = parseFloat(priceMin.value || '0');
        const max = parseFloat(priceMax.value || '0');
        const filtered = products.filter(p=>{
          if(cat && p.category !== cat) return false;
          if(brand && p.brand !== brand) return false;
          if(min && p.price < min) return false;
          if(max && p.price > max) return false;
          if(q){
            const hay = (p.title + ' ' + p.brand + ' ' + p.category).toLowerCase();
            if(!hay.includes(q)) return false;
          }
          return true;
        });
        // re-render grid
        grid.innerHTML = '';
        filtered.forEach(p => {
          const card = document.createElement('article');
          card.className = 'product-card';
          card.innerHTML = `
            <a href="product.html?id=${p.id}" class="thumb"><img src="${p.images[0]}" loading="lazy" alt="${p.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/640x360?text=No+Image'"/></a>
            <div class="meta">
              <a href="product.html?id=${p.id}" class="title">${p.title}</a>
              <div class="brand">${p.brand}</div>
              <div class="price">${formatPrice(p.price)}</div>
            </div>
            <div class="actions">
              <button class="btn small add" data-id="${p.id}">Add to cart</button>
            </div>
          `;
          grid.appendChild(card);
        });
  // rebind add
  grid.querySelectorAll('.add').forEach(b=> b.addEventListener('click', ()=>{ addToCart(b.dataset.id,1); if(window.showToast) showToast('Added to cart','success'); else alert('Added to cart'); }));
      }

      [search, catSel, brandSel, priceMin, priceMax].forEach(el=> el.addEventListener('input', applyFilters));
      if(initialQ) applyFilters();
    }
  }
}

// Render product detail
async function renderProductDetail(containerId='product-detail'){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return;
  const products = await fetchProducts();
  const p = products.find(x => x.id === id);
  const container = document.getElementById(containerId);
  if(!container) return;
  if(!p){ container.innerHTML = '<p>Product not found.</p>'; return; }
  // build gallery HTML with thumbnails
  const galleryHtml = `
    <div class="gallery-main"><img id="main-img" src="${p.images[0]}" loading="lazy" alt="${p.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/800x500?text=No+Image'"/></div>
    <div class="gallery-thumbs">${p.images.map((src, i)=>`<button class="thumb-btn" data-src="${src}" aria-label="View image ${i+1}"><img src="${src}" loading="lazy" alt="thumb ${i+1}" onerror="this.onerror=null;this.src='https://via.placeholder.com/120x80?text=No'"/></button>`).join('')}</div>
  `;

  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="gallery">${galleryHtml}</div>
      <div class="info">
        <h1>${p.title}</h1>
        <div class="brand muted">${p.brand}</div>
        <div class="price large">${formatPrice(p.price)}</div>
        <p class="muted">Rating: ${p.rating} ★</p>
        <ul class="features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
        <div style="margin-top:1rem"><button class="btn primary add" data-id="${p.id}">Add to cart</button></div>
      </div>
    </div>
  `;

  // thumbnail click -> swap main image
  const thumbButtons = container.querySelectorAll('.thumb-btn');
  thumbButtons.forEach(btn=> btn.addEventListener('click', ()=>{
    const src = btn.dataset.src;
    const main = container.querySelector('#main-img');
    if(main) main.src = src;
  }));

  container.querySelectorAll('.add').forEach(b=> b.addEventListener('click', ()=>{ addToCart(p.id,1); if(window.showToast) showToast('Added to cart','success'); else alert('Added to cart'); }));
}

// Render cart
async function renderCart(containerId='cart-root'){
  const products = await fetchProducts();
  const cart = loadCart();
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  const entries = Object.entries(cart);
  if(entries.length === 0){ container.innerHTML = '<p>Your cart is empty.</p>'; return; }
  const table = document.createElement('div');
  table.className = 'cart-list';
  let total = 0;
  entries.forEach(([id, qty])=>{
    const p = products.find(x=>x.id === id);
    if(!p) return;
    const row = document.createElement('div');
    row.className = 'cart-row';
    const subtotal = p.price * qty;
    total += subtotal;
    row.innerHTML = `
      <img src="${p.images[0]}" loading="lazy" alt="${p.title}" class="cart-thumb" onerror="this.onerror=null;this.src='https://via.placeholder.com/160x120?text=No+Image'">
      <div class="cart-info">
        <div class="title">${p.title}</div>
        <div class="muted">${p.brand}</div>
      </div>
      <div class="cart-controls">
  <input type="number" min="0" value="${qty}" data-id="${id}" class="qty-input">
        <div class="price">${formatPrice(subtotal)}</div>
        <button class="btn small remove" data-id="${id}">Remove</button>
      </div>
    `;
    table.appendChild(row);
  });
  const footer = document.createElement('div');
  footer.className = 'cart-footer';
  footer.innerHTML = `<div class="total">Total: <strong>${formatPrice(total)}</strong></div><div><button class="btn primary checkout">Proceed to Checkout</button></div>`;
  container.appendChild(table);
  container.appendChild(footer);

  // bind events
  container.querySelectorAll('.remove').forEach(b=> b.addEventListener('click', ()=>{ removeFromCart(b.dataset.id); renderCart(containerId); }));
  container.querySelectorAll('.qty-input').forEach(i=> i.addEventListener('change', ()=>{ updateCartItem(i.dataset.id, parseInt(i.value || '0',10)); renderCart(containerId); }));
  container.querySelector('.checkout')?.addEventListener('click', ()=>{ location.href = 'checkout.html'; });
}

// Checkout rendering & order placement
function loadOrders(){ try{ return JSON.parse(localStorage.getItem('re_orders_v1')||'[]'); }catch(e){ return []; } }
function saveOrders(arr){ localStorage.setItem('re_orders_v1', JSON.stringify(arr)); }

async function renderCheckout(containerId='checkout-root'){
  const products = await getProducts();
  const cart = loadCart();
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  const entries = Object.entries(cart || {});
  const page = document.createElement('div'); page.className = 'checkout-page';

  const left = document.createElement('div'); left.className = 'checkout-main';
  const right = document.createElement('aside'); right.className = 'order-summary';

  // left: items + form
  left.innerHTML = `
    <h2>Checkout</h2>
    <p>Complete your order by filling the billing details below.</p>
    <div id="checkout-items"></div>
    <hr />
    <form id="checkout-form" class="checkout-form">
      <label>Full name<input type="text" id="checkout-name" placeholder="John Doe" required></label>
      <label>Email<input type="email" id="checkout-email" placeholder="you@example.com" required></label>
      <label>Phone<input type="tel" id="checkout-phone" placeholder="9876543210"></label>
      <label>Address<textarea id="checkout-address" rows="3" placeholder="Street, City, ZIP" required></textarea></label>
      <div>
        <label>Payment method</label>
        <div class="payment-options" id="payment-options">
          <button type="button" data-method="card" class="active">Card</button>
          <button type="button" data-method="upi">UPI</button>
          <button type="button" data-method="netbank">Netbanking</button>
          <button type="button" data-method="cod">COD</button>
        </div>
        <div class="payment-fields" id="payment-fields">
          <div class="field" data-for="card">
            <div class="payment-grid">
              <input placeholder="Card number (xxxx xxxx xxxx xxxx)" id="pay-card-number">
              <input placeholder="MM/YY" id="pay-card-exp">
              <input placeholder="Name on card" id="pay-card-name">
              <input placeholder="CVV" id="pay-card-cvv">
            </div>
          </div>
          <div class="field" data-for="upi" style="display:none">
            <input placeholder="UPI ID (example@bank)" id="pay-upi-id">
          </div>
          <div class="field" data-for="netbank" style="display:none">
            <select id="pay-netbank">
              <option value="">Select bank</option>
              <option>ICICI</option>
              <option>HDFC</option>
              <option>SBI</option>
              <option>AXIS</option>
            </select>
          </div>
          <div class="field" data-for="cod" style="display:none">
            <div class="muted">Cash on Delivery available. Please pay the delivery executive.</div>
          </div>
        </div>
      </div>
      <div style="margin-top:0.8rem"><button type="submit" class="btn btn-primary">Place order</button></div>
    </form>
  `;

  // payment selection logic
  const paymentOptions = left.querySelectorAll('#payment-options button');
  const paymentFields = left.querySelectorAll('#payment-fields .field');
  let selectedPayment = 'card';
  function setPayment(m){
    selectedPayment = m;
    paymentOptions.forEach(b=> b.classList.toggle('active', b.dataset.method === m));
    paymentFields.forEach(f=> f.style.display = (f.dataset.for === m) ? '' : 'none');
  }
  paymentOptions.forEach(b=> b.addEventListener('click', ()=> setPayment(b.dataset.method)));

  right.innerHTML = `
    <h3>Order Summary</h3>
    <div id="summary-items"></div>
    <div class="summary-line"><span>Subtotal</span><span id="summary-subtotal">${formatPrice(0)}</span></div>
    <div class="summary-line"><span>Shipping</span><span id="summary-shipping">${formatPrice(0)}</span></div>
    <div class="summary-line total"><span>Total</span><span id="summary-total">${formatPrice(0)}</span></div>
    <div class="pay-note">We accept card, UPI and cash on delivery. This is a demo checkout.</div>
  `;

  page.appendChild(left); page.appendChild(right); container.appendChild(page);

  const itemsContainer = document.getElementById('checkout-items');
  const summaryItems = document.getElementById('summary-items');

  if(entries.length === 0){
    itemsContainer.innerHTML = '<p>Your cart is empty. <a href="catalog.html">Shop now</a></p>';
    summaryItems.innerHTML = '';
    document.getElementById('summary-subtotal').textContent = formatPrice(0);
    document.getElementById('summary-total').textContent = formatPrice(0);
    return;
  }

  let subtotal = 0;
  itemsContainer.innerHTML = '';
  summaryItems.innerHTML = '';
  for(const [id, qty] of entries){
    const p = products.find(x=>x.id === id) || {title:'Item', price:0, images:[]};
    const prodPrice = parseFloat(p.price || 0);
    const row = document.createElement('div'); row.className = 'item-row';
    row.innerHTML = `
      <img src="${p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/160x120?text=No+Image'}" alt="${escapeHtml(p.title || '')}">
      <div style="flex:1">
        <div style="font-weight:600">${escapeHtml(p.title || '')}</div>
        <div style="font-size:0.95rem;color:var(--muted)">Qty: ${qty} × ${formatPrice(prodPrice)}</div>
      </div>
      <div style="font-weight:700">${formatPrice(prodPrice * qty)}</div>
    `;
    itemsContainer.appendChild(row);

    const srow = document.createElement('div'); srow.className = 'summary-line';
    srow.innerHTML = `<span>${escapeHtml(p.title || '')} x ${qty}</span><span>${formatPrice(prodPrice * qty)}</span>`;
    summaryItems.appendChild(srow);

    subtotal += prodPrice * qty;
  }

  const shipping = subtotal > 10000 ? 0 : 199;
  const total = subtotal + shipping;
  document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('summary-shipping').textContent = formatPrice(shipping);
  document.getElementById('summary-total').textContent = formatPrice(total);

  // place order handler with payment detail capture
  document.getElementById('checkout-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    // basic validation
    const name = document.getElementById('checkout-name').value || 'Guest';
    const email = document.getElementById('checkout-email').value || '';
    const address = document.getElementById('checkout-address').value || '';
    if(!name || !email || !address){ if(window.showToast) showToast('Please fill required fields','error'); return; }

    // gather payment info depending on selectedPayment
    const paymentInfo = { method: selectedPayment };
    if(selectedPayment === 'card'){
      const num = document.getElementById('pay-card-number').value || '';
      const exp = document.getElementById('pay-card-exp').value || '';
      const cname = document.getElementById('pay-card-name').value || '';
      const cvv = document.getElementById('pay-card-cvv').value || '';
      if(!num || !exp || !cname || !cvv){ if(window.showToast) showToast('Please complete card details','error'); return; }
      paymentInfo.card = { number: '**** **** **** ' + num.slice(-4), name: cname, exp };
    }else if(selectedPayment === 'upi'){
      const upi = document.getElementById('pay-upi-id').value || '';
      if(!upi){ if(window.showToast) showToast('Please enter UPI ID','error'); return; }
      paymentInfo.upi = upi;
    }else if(selectedPayment === 'netbank'){
      const bank = document.getElementById('pay-netbank').value || '';
      if(!bank){ if(window.showToast) showToast('Please select bank','error'); return; }
      paymentInfo.bank = bank;
    }else if(selectedPayment === 'cod'){
      // no extra fields
    }

    const order = {
      id: 'ORD' + Date.now(),
      items: entries,
      created: Date.now(),
      name, email, address,
      payment: paymentInfo,
      subtotal, shipping, total
    };
    const orders = loadOrders(); orders.push(order); saveOrders(orders);
    localStorage.removeItem(STORE_KEY);
    if(window.showToast) showToast('Order placed! Redirecting to invoice...','success');
    setTimeout(()=>{ window.location.href = 'invoice.html?id=' + encodeURIComponent(order.id); }, 700);
  });
}

function renderOrderConfirmation(containerId='order-confirm'){
  (async ()=>{
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const container = document.getElementById(containerId);
    if(!container){ return; }
    const orders = loadOrders();
    const order = orders.find(o=>o.id===id);
    if(!order){ container.innerHTML = '<p>Order not found.</p>'; return; }
    let html = `<h2>Thank you — order ${order.id}</h2><p>Placed on ${new Date(order.created).toLocaleString()}</p><h3>Items</h3><ul>`;
    const products = await getProducts();
    order.items.forEach(([id,qty])=>{
      const p = products.find(x=>x.id===id);
      if(p) html += `<li>${qty} × ${p.title} — ${formatPrice(p.price*qty)}</li>`;
    });
    html += `</ul><p class="muted">We have sent order details to your account (mock).</p>`;
    // payment summary
    if(order.payment){
      html += `<h3>Payment</h3><div class="order-payment">Method: <strong>${escapeHtml(order.payment.method)}</strong>`;
      if(order.payment.card) html += `<div>Card: ${escapeHtml(order.payment.card.number)} — ${escapeHtml(order.payment.card.name)}</div>`;
      if(order.payment.upi) html += `<div>UPI ID: ${escapeHtml(order.payment.upi)}</div>`;
      if(order.payment.bank) html += `<div>Bank: ${escapeHtml(order.payment.bank)}</div>`;
      html += `</div>`;
    }
    // totals
    if(typeof order.subtotal !== 'undefined'){
      html += `<div class="order-totals"><div>Subtotal: <strong>${formatPrice(order.subtotal)}</strong></div><div>Shipping: <strong>${formatPrice(order.shipping)}</strong></div><div>Total: <strong>${formatPrice(order.total)}</strong></div></div>`;
    }
    // add invoice link
    html += `<p style="margin-top:1rem"><a class="btn" href="invoice.html?id=${encodeURIComponent(order.id)}">View / Print Invoice</a></p>`;
    container.innerHTML = html;
  })();
}

// Render a printable invoice page for a given order id from ?id=
function renderInvoice(containerId='invoice-root'){
  (async ()=>{
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const container = document.getElementById(containerId);
    if(!container) return;
    const orders = loadOrders();
    const order = orders.find(o=>o.id===id);
    if(!order){ container.innerHTML = '<p>Invoice not found.</p>'; return; }
    const products = await getProducts();

    // build invoice HTML
    let html = `<div class="invoice-header"><div>
      <h2>RajElectronics</h2>
      <div class="invoice-meta">GSTIN: 29ABCDE1234F2Z5<br/>Contact: support@rajelectronics.local</div>
    </div>
    <div style="text-align:right">
      <div><strong>Invoice</strong></div>
      <div>Order: <strong>${escapeHtml(order.id)}</strong></div>
      <div>${new Date(order.created).toLocaleString()}</div>
    </div></div>
    <hr />`;

    html += `<table style="width:100%;border-collapse:collapse;margin-top:0.6rem">
      <thead><tr style="text-align:left;border-bottom:1px solid #e5e7eb"><th>Item</th><th>Qty</th><th>Rate</th><th style="text-align:right">Amount</th></tr></thead><tbody>`;

    let subtotal = 0;
    order.items.forEach(([pid, qty])=>{
      const p = products.find(x=>x.id === pid) || {title:'Item', price:0};
      const amount = (p.price || 0) * qty;
      subtotal += amount;
      html += `<tr style="border-bottom:1px solid #f3f4f6"><td>${escapeHtml(p.title || '')}</td><td>${qty}</td><td>${formatPrice(p.price || 0)}</td><td style="text-align:right">${formatPrice(amount)}</td></tr>`;
    });

    const shipping = typeof order.shipping !== 'undefined' ? order.shipping : (subtotal > 10000 ? 0 : 199);
    const total = typeof order.total !== 'undefined' ? order.total : (subtotal + shipping);

    html += `</tbody></table>
      <div style="margin-top:0.8rem;display:flex;justify-content:space-between;align-items:center">
        <div class="muted">Billed to: <strong>${escapeHtml(order.name || '')}</strong><br/>${escapeHtml(order.email || '')}<br/>${escapeHtml(order.address || '')}</div>
        <div style="text-align:right">
          <div>Subtotal: <strong>${formatPrice(subtotal)}</strong></div>
          <div>Shipping: <strong>${formatPrice(shipping)}</strong></div>
          <div style="font-size:1.1rem;margin-top:0.4rem">Total: <strong>${formatPrice(total)}</strong></div>
        </div>
      </div>
      <div style="margin-top:1rem;display:flex;gap:0.6rem">
        <button class="btn no-print" id="printBtn">Print Invoice</button>
        <a class="btn no-print" href="order-confirmation.html?id=${encodeURIComponent(order.id)}">Back to Order</a>
      </div>`;

    container.innerHTML = html;

    document.getElementById('printBtn')?.addEventListener('click', ()=> window.print());
  })();
}

// Export for global use
window.REStore = { renderCatalog, renderProductDetail, renderCart, renderCheckout, renderOrderConfirmation, addToCart, loadCart, renderInvoice };
// render a simple featured list on homepage
async function renderFeatured(containerId='featured', count=4){
  const products = await getProducts();
  const container = document.getElementById(containerId);
  if(!container) return;
  const featured = products.slice(0,count);
  container.innerHTML = '';
  const wrap = document.createElement('div'); wrap.className='product-grid';
  featured.forEach(p=>{
    const card = document.createElement('article'); card.className='product-card';
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="thumb"><img src="${p.images[0]}" alt="${p.title}"></a>
      <div class="meta">
        <a href="product.html?id=${p.id}" class="title">${p.title}</a>
        <div class="brand">${p.brand}</div>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
      <div class="actions"><button class="btn small add" data-id="${p.id}">Add to cart</button></div>
    `;
    wrap.appendChild(card);
  });
  container.appendChild(wrap);
  wrap.querySelectorAll('.add').forEach(b=> b.addEventListener('click', ()=>{ addToCart(b.dataset.id,1); if(window.showToast) showToast('Added to cart','success'); else alert('Added to cart'); }));
}

// expose new functions
window.REStore.renderFeatured = renderFeatured;
