// Daftar produk yang ditampilkan di katalog.
const products = [
	{
		name: "Sarung Atlas Idaman Kembang 555",
		price: 85000,
		image: "img/Atlas Idaman Kembang 555 Motif Bhs.jpg",
		description: "Motif kembang klasik yang cocok untuk ibadah dan kegiatan sehari-hari."
	},
	{
		name: "Sarung Atlas Idaman Harmoni 555",
		price: 90000,
		image: "img/sarung atlas idaman harmoni 555 motif bhs nyaman elegant.jpg",
		description: "Motif harmonis dengan tampilan rapi untuk dipakai di rumah maupun saat bepergian."
	},
	{
		name: "Sarung Atlas Super Premium 970",
		price: 125000,
		image: "img/SARUNG ATLAS SUPER PREMIUM 970 MOTIF SONGKET GRADE SILVER.jpg",
		description: "Motif songket memberi kesan lebih istimewa untuk acara dan hadiah."
	},
	{
		name: "Sarung BHS Infinity BBR",
		price: 175000,
		image: "img/ZS - Sarung BHS Infinity Termurah Sarung Bhs Original BBR INFT 4.jpg",
		description: "Pilihan BHS Infinity dengan motif elegan untuk melengkapi pakaian ibadah."
	},
	{
		name: "Sarung BHS Infinity Gold",
		price: 195000,
		image: "img/ZS - Sarung BHS Infinity Termurah Sarung Bhs Original GOLD 5.jpg",
		description: "Varian Infinity dengan aksen warna gold untuk tampilan yang menonjol."
	},
	{
		name: "Sarung BHS Infinity S6",
		price: 185000,
		image: "img/ZS - Sarung BHS Infinity Termurah Sarung Bhs Original S6.jpg",
		description: "Varian BHS Infinity dengan motif rapi untuk dipakai dalam berbagai kegiatan."
	},
	{
		name: "Sarung Wadimor Pasundan",
		price: 80000,
		image: "img/Sarung Wadimor Pasundan Motif Terbaru.jpg",
		description: "Motif Pasundan bernuansa tradisional, cocok untuk pemakaian sehari-hari."
	},
	{
		name: "Sarung Wadimor Reality Batik 05",
		price: 95000,
		image: "img/SARUNG WADIMOR REALITY BATIK ORIGINAL MIX WD-RLB_05 Standart.jpg",
		description: "Motif batik dengan paduan warna yang mudah dipadukan dengan baju koko."
	},
	{
		name: "Sarung Wadimor Reality Batik 12",
		price: 95000,
		image: "img/SARUNG WADIMOR REALITY BATIK ORIGINAL MIX WD-RLB_12 Standart.jpg",
		description: "Varian batik Reality untuk tampilan santai maupun acara keluarga."
	}
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const cartCount = document.getElementById("cartCount");
const productDialog = document.getElementById("productDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const closeDialog = document.getElementById("closeDialog");
const dialogBuyButton = document.getElementById("dialogBuyButton");

let totalItems = 0;

function showProducts(productArray) {
	productList.innerHTML = "";

	["Atlas", "BHS", "Wadimor"].forEach(function (brand) {
		const brandProducts = productArray.filter(function (product) {
			return product.name.includes(brand);
		});
		if (brandProducts.length === 0) return;

		const group = document.createElement("section");
		group.className = "product-group";
		group.innerHTML = `<h3>Sarung ${brand}</h3><div class="product-grid"></div>`;
		const grid = group.querySelector(".product-grid");

		brandProducts.forEach(function (product) {
			const productCard = document.createElement("article");
			productCard.className = "product-card";
			productCard.innerHTML = `
				<button type="button" class="product-open" data-name="${product.name}">
					<img src="${product.image}" alt="${product.name}">
					<div class="product-info">
						<h4>${product.name}</h4>
						<p class="price">Rp ${product.price.toLocaleString("id-ID")}</p>
						<span class="detail-hint">Lihat deskripsi</span>
					</div>
				</button>
			`;
			grid.appendChild(productCard);
		});

		productList.appendChild(group);
	});

	emptyMessage.hidden = productArray.length > 0;
}

productList.addEventListener("click", function (event) {
	const button = event.target.closest(".product-open");
	if (!button) return;

	const product = products.find(function (item) {
		return item.name === button.dataset.name;
	});
	dialogTitle.textContent = product.name;
	dialogDescription.textContent = product.description;
	productDialog.showModal();
});

closeDialog.addEventListener("click", function () {
	productDialog.close();
});

productDialog.addEventListener("click", function (event) {
	if (event.target === productDialog) {
		productDialog.close();
	}
});

dialogBuyButton.addEventListener("click", function () {
	totalItems++;
	cartCount.textContent = totalItems;
	productDialog.close();
});

searchInput.addEventListener("input", function () {
	showProducts(products.filter(function (product) {
		return product.name.toLowerCase().includes(searchInput.value.toLowerCase());
	}));
});

showProducts(products);
