let userId;

async function initializeLiff() {
    await liff.init({ liffId: '1661402891-kg2vBR78' });
    if (!liff.isLoggedIn()) {
        liff.login();
    } else {
        userId = liff.getContext().userId;
        runApp();
        updateCart();
        loadProducts();
        loadCart();
    }
}
// แจ้งเตือนตะกร้าเต็ม
function showCartFullWarning() {
    const warning = document.getElementById('cart-full-danger');
    warning.style.display = 'block';
    setTimeout(() => {
        warning.style.display = 'none';
    }, 5000); // Hide the warning after 5 seconds
}

// ฟังก์ชันที่ล้างตะกร้าหลังจากสั่งซื้อ
function clearCart() {
    // ล้างข้อมูลใน localStorage
    if (userId) {
        localStorage.removeItem(`cart_${userId}`);
    }
    cart.length = 0; // ล้างตะกร้าหรืออาจใช้วิธีที่เหมาะสมกับการจัดการข้อมูลตะกร้า
    updateCart(); // อัพเดตหน้าตะกร้าหลังจากล้าง
}

function runApp() {
        liff.getProfile().then(profile => {
            document.getElementById("pictureUrl").src = profile.pictureUrl;
            document.getElementById("userId").innerHTML = '<b>UserId:</b> ' + profile.userId;
            document.getElementById("displayName").innerHTML = '<b>DisplayName:</b> ' + profile.displayName;
            document.getElementById("statusMessage").innerHTML = '<b>StatusMessage:</b> ' + profile.statusMessage;
            document.getElementById("getDecodedIDToken").innerHTML = '<b>Email:</b> ' + liff.getDecodedIDToken().email;
        }).catch(err => console.error('Error getting profile', err));
    }

    document.addEventListener('DOMContentLoaded', (event) => {
// Function to load address data from localStorage
function loadAddressData() {
    const addressData = localStorage.getItem('addressData');
    if (addressData) {
        const address = JSON.parse(addressData);
        const fullAddress = `
            ${address.recipientName}
            ${address.phone}<br>
            ${address.address}
            ${address.district}
            ${address.amphoe}<br>
            ${address.province}
            ${address.zipcode}
        `;
        document.getElementById('addressCard').innerHTML = fullAddress;

        // Fill form with saved data
        document.getElementById('recipientName').value = address.recipientName;
        document.getElementById('phone').value = address.phone;
        document.getElementById('address').value = address.address;
        document.getElementById('district').value = address.district;
        document.getElementById('amphoe').value = address.amphoe;
        document.getElementById('province').value = address.province;
        document.getElementById('zipcode').value = address.zipcode;
    }
}

// Function to save address data to localStorage
function saveAddressData(address) {
    localStorage.setItem('addressData', JSON.stringify(address));
}

// Load address data when the page loads
loadAddressData();

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const address = {
        recipientName: document.getElementById('recipientName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        district: document.getElementById('district').value,
        amphoe: document.getElementById('amphoe').value,
        province: document.getElementById('province').value,
        zipcode: document.getElementById('zipcode').value
    };

    // Construct the address string
    const fullAddress = `
        ${address.recipientName}
        ${address.phone}<br>
        ${address.address}
        ${address.district}
        ${address.amphoe}<br>
        ${address.province}
        ${address.zipcode}
    `;

    // Update the addressCard element
    document.getElementById('addressCard').innerHTML = fullAddress;

    // Save the address data to localStorage
    saveAddressData(address);

    // Close the address modal (if you use Bootstrap modals)
    $('#addressModal').modal('hide');
});
});

document.addEventListener('DOMContentLoaded', () => {
        const cartModalElement = document.getElementById('cartModal');
        const editAddressBtn = document.getElementById('editAddressBtn');
        const closeAddressModalBtn = document.getElementById('closeAddressModalBtn');
        const addressModalElement = document.getElementById('addressModal');
        const addressModal = new bootstrap.Modal(addressModalElement, {
            backdrop: 'static',
            keyboard: false
        });
        
        // Function to check if address fields are empty
        const isAddressFormEmpty = () => {
            const recipientName = document.getElementById('recipientName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const district = document.getElementById('district').value.trim();
            const amphoe = document.getElementById('amphoe').value.trim();
            const province = document.getElementById('province').value.trim();
            const zipcode = document.getElementById('zipcode').value.trim();
            
            return !recipientName || !phone || !address || !district || !amphoe || !province || !zipcode;
        };

        // Open the address modal if form is empty
        if (isAddressFormEmpty()) {
            editAddressBtn.click();
        }

        const cartModal = new bootstrap.Modal(cartModalElement, {
            backdrop: 'static',
            keyboard: false
        });

        const addressForm = document.getElementById('addressForm');

        let initialAddressData = {};

        const saveInitialAddressData = () => {
            initialAddressData = {
                recipientName: document.getElementById('recipientName').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                district: document.getElementById('district').value,
                amphoe: document.getElementById('amphoe').value,
                province: document.getElementById('province').value,
                zipcode: document.getElementById('zipcode').value
            };
        };

        const restoreInitialAddressData = () => {
            document.getElementById('recipientName').value = initialAddressData.recipientName;
            document.getElementById('phone').value = initialAddressData.phone;
            document.getElementById('address').value = initialAddressData.address;
            document.getElementById('district').value = initialAddressData.district;
            document.getElementById('amphoe').value = initialAddressData.amphoe;
            document.getElementById('province').value = initialAddressData.province;
            document.getElementById('zipcode').value = initialAddressData.zipcode;
        };
        // Example of how you might open the modal
        document.getElementById('openCartModalBtn').addEventListener('click', () => {
            cartModal.show();
        });

        // Example of how you might hide the modal programmatically
        document.getElementById('closeCartModalBtn').addEventListener('click', () => {
            cartModal.hide();
        });

        editAddressBtn.addEventListener('click', () => {
            saveInitialAddressData();
            addressModal.show();
        });

        closeAddressModalBtn.addEventListener('click', () => {
            restoreInitialAddressData();
            addressModal.hide();
        });

        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Save the address data
            // Optionally update the addressCard element with new address data
            addressModal.hide();
        });

        // Restore initial address data if modal is hidden without submitting
        addressModalElement.addEventListener('hidden.bs.modal', () => {
            // If the form is not submitted, restore the initial address data
            if (!addressForm.checkValidity()) {
                restoreInitialAddressData();
            }
        });
    });



    // Load products from Google Sheets
    async function loadProducts() {
        try {
            const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1BrP4sKXmRVV41uVxtme6U68ROo2YwjaiMwAqSXgni1Q/values/product!A2:E?key=AIzaSyAvfiAtJCUdE_Sxa7REZVTW3n7pCuzJ75U');
            const products = response.data.values.map(row => ({
                name: row[0],
                img: row[1],
                category: row[2],
                pricemkt: parseInt(row[3]),
                price: parseInt(row[4])
            }));

            const categories = [...new Set(products.map(product => product.category))];
            const categoryFilter = document.getElementById('categoryFilter');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            window.products = products; // Store products globally for filtering
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products
    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear current products
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body" style="text-align: center;">
                    <h6 class="card-title">${product.name}</h6>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <div class="card-text" style="color: #E4003A; font-size:20px; font-weight: bold;">฿${product.price}</div>
                        <div class="card-text" style="color: #DDDDDD; font-size:16px; margin-left: 2px; text-decoration: line-through;">฿${product.pricemkt}</div>
                        <div class="card-text" style="background-color: #FFEDED; color: #E4003A; font-size:16px; margin-left: 2px; border-radius: 5px;">-${calculateDiscountPercentage(product.price, product.pricemkt)}%</div>
                    </div>
                    <button class="btn btn-success" style="margin-top: 10px;" onclick="addToCart(${JSON.stringify(product)})">เพิ่มใส่ตะกร้า</button>
                </div>
            `;
            productDiv.querySelector('button').onclick = () => addToCart(product);
            productList.appendChild(productDiv);
        });
    }

    function calculateDiscountPercentage(price, pricemkt) {
        let discount = ((pricemkt - price) / pricemkt) * 100;
        return discount.toFixed(0); // ปัดตัวเลขให้เป็นจำนวนเต็ม
    }

    // Filter products
    function filterProducts() {
          const selectedCategory = document.getElementById('categoryFilter').value;
          const filteredProducts = selectedCategory === 'all' ? window.products : window.products.filter(product => product.category === selectedCategory);
          displayProducts(filteredProducts);
      }

    function saveCart() {
        if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }
    }

    function loadCart() {
        if (userId) {
            const savedCart = localStorage.getItem(`cart_${userId}`);
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCart();
            }
        }
    }

      // Add product to cart
      let cart = [];
      function addToCart(product) {
    if (cart.length >= 7) {
        showCartFullWarning();
        animateCartButton();
    } else {
        cart.push(product);
        updateCart();
        saveCart();
        animateCartButton();
    }
}

      // Remove product from cart
      function removeFromCart(index) {
          cart.splice(index, 1);
          updateCart();
          saveCart();
      }

      function updateCart() {
const cartDiv = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout');

cartDiv.innerHTML = '';

// Initialize total price
let totalPrice = 0;

cart.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'cart-item';
    productDiv.innerHTML = `
        <span>${index + 1}.${product.name}</span>
        <span>${product.price} บาท</span>
        <button type="button" class="btn-close" onclick="removeFromCart(${index})"></button>
    `;
    cartDiv.appendChild(productDiv);

    // Add to total price
    totalPrice += product.price;
});

// Update cart count
cartCount.textContent = `${cart.length}`;

// Update total price
const totalPriceDiv = document.createElement('div');
totalPriceDiv.className = 'cart-total';
totalPriceDiv.innerHTML = `<strong>🚛 ส่งฟรี⚡ ยอดรวม : ${totalPrice} บาท</strong>`;
cartDiv.appendChild(totalPriceDiv);

// Show or hide checkout button based on cart items
checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
}
      
      // Animate cart button
      function animateCartButton() {
        const cartButton = document.querySelector('.cart-button');
        cartButton.classList.add('clicked');

        setTimeout(() => {
            cartButton.classList.remove('clicked');
        }, 200); // Reset to original size after 0.2 seconds
      }

      // Handle checkout
document.getElementById('checkout').onclick = async () => {
// ดึงข้อมูลที่อยู่จากฟอร์ม
const recipientName = document.getElementById('recipientName').value;
const phone = document.getElementById('phone').value;
const address = document.getElementById('address').value;
const district = document.getElementById('district').value;
const amphoe = document.getElementById('amphoe').value;
const province = document.getElementById('province').value;
const zipcode = document.getElementById('zipcode').value;

    // คำนวณยอดรวมจากข้อมูลในตะกร้า
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    const currentDateTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

    // สร้าง Flex Message
    const flexMessage = {
        "type": "flex",
        "altText": "รายการสั่งซื้อของฉัน",
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": `วันที่ ${currentDateTime}`,
                        "weight": "bold",
                        "size": "xs"
                    },
                    {
                        "type": "text",
                        "text": "รายการ",
                        "weight": "bold",
                        "size": "md",
                        "margin": "sm"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "xs",
                        "spacing": "sm",
                        "contents": cart.map((product, index) => ({
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": `${index + 1}. ${product.name}`,
                                    "color": "#555555",
                                    "size": "sm",
                                    "flex": 0
                                },
                                {
                                    "type": "text",
                                    "text": `${product.price} บาท`,
                                    "color": "#111111",
                                    "size": "sm",
                                    "align": "end"
                                }
                            ]
                        }))
                    },
                    {
                        "type": "separator",
                        "margin": "xs"
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "margin": "xs",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ยอดรวม",
                                "weight": "bold",
                                "color": "#555555",
                                "size": "md",
                                "flex": 0
                            },
                            {
                                "type": "text",
                                "text": `${total} บาท`,
                                "weight": "bold",
                                "color": "#111111",
                                "size": "md",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "xs"
                    },
                    {
                        "type": "text",
                        "text": "🚛 ส่งฟรีทั่วประเทศ",
                        "weight": "bold",
                        "color": "#E4003A",
                        "size": "md",
                        "margin": "xs",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "text": "ที่อยู่จัดส่ง:",
                        "weight": "bold",
                        "size": "sm",
                        "margin": "sm"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "xs",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "baseline",
                                "margin": "xs",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `${recipientName}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": ` ${phone}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "margin": "xs",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `${address}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": `${district}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    }                    
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "margin": "xs",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `${amphoe}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": `${province}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": ` ${zipcode}`,
                                        "color": "#555555",
                                        "size": "sm"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    };
    clearCart(); // ล้างตะกร้าหลังจากส่งข้อความ

    await liff.sendMessages([
        {
            type: "text",
            text: "รายการสั่งซื้อของฉัน",
        },
        flexMessage
    ]);


    alert('สั่งซื้อสำเร็จ! ดำเนินการชำระเงินต่อที่แชท');
    liff.closeWindow(); // ปิดหน้าต่าง LIFF หลังจากส่งข้อความ
};
initializeLiff();