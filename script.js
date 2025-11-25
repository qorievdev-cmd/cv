document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Фильтрация товаров по цвету
    const colorFilters = document.querySelectorAll('.color-filter');
    if (colorFilters.length > 0) {
        colorFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                
                // Удаляем активный класс у всех фильтров
                colorFilters.forEach(f => f.classList.remove('active'));
                // Добавляем активный класс текущему фильтру
                this.classList.add('active');
                
                // Фильтрация товаров
                filterProductsByColor(color);
            });
        });
    }

    // Функция фильтрации товаров по цвету
    function filterProductsByColor(color) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productColor = product.getAttribute('data-color');
            
            if (color === 'all' || productColor === color) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Переключение изображений товара
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails.length > 0) {
        const mainImage = document.getElementById('mainProductImage');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Удаляем активный класс у всех миниатюр
                thumbnails.forEach(t => t.classList.remove('active'));
                // Добавляем активный класс текущей миниатюре
                this.classList.add('active');
                
                // Меняем основное изображение
                const newImageSrc = this.getAttribute('data-image');
                if (mainImage && newImageSrc) mainImage.src = newImageSrc;
            });
        });
    }

    // Выбор цвета товара
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Удаляем активный класс у всех вариантов цвета
                colorOptions.forEach(o => o.classList.remove('active'));
                // Добавляем активный класс текущему варианту
                this.classList.add('active');
            });
        });
    }

    // Изменение количества товара
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value) || 1;
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value) || 1;
            quantityInput.value = value + 1;
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value) || 1;
            if (value < 1) {
                this.value = 1;
            }
        });
    }

    // Добавление товара в корзину
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            alert('Товар добавлен в корзину!');
        });
    }

    // Отправка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Загрузка товаров на главной странице
    if (document.querySelector('.popular-products .products-grid')) {
        loadPopularProducts();
    }

    // Загрузка товаров в каталоге
    if (document.querySelector('.catalog-products .products-grid')) {
        loadAllProducts();
    }

    // Загрузка похожих товаров на странице товара
    if (document.querySelector('.related-products .products-grid')) {
        loadRelatedProducts();
    }

    // Инициализация анимаций при загрузке страницы
    initScrollAnimations();
});

// Функция загрузки популярных товаров
function loadPopularProducts() {
    const productsGrid = document.querySelector('.popular-products .products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const products = [
        { id: 1, name: 'Набор ковриков (серый)', price: 2490, color: 'gray', image: 'assets/images/product-gray.jpg' },
        { id: 2, name: 'Набор ковриков (белый)', price: 2490, color: 'white', image: 'assets/images/product-white.jpg' },
        { id: 3, name: 'Набор ковриков (черный)', price: 2490, color: 'black', image: 'assets/images/product-black.jpg' },
        { id: 4, name: 'Набор ковриков (синий)', price: 2490, color: 'blue', image: 'assets/images/product-blue.jpg' }
    ];
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-color', product.color);
        
        productCard.innerHTML = 
            '<div class="product-image">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
            '</div>' +
            '<div class="product-info">' +
                '<h3 class="product-title">' + product.name + '</h3>' +
                '<div class="product-price">' +
                    '<span class="current-price">' + product.price.toLocaleString() + ' ₽</span>' +
                '</div>' +
                '<a href="product-detail.html?id=' + product.id + '" class="btn btn-primary add-to-cart">Подробнее</a>' +
            '</div>';
        
        productsGrid.appendChild(productCard);
    });
}

// Функция загрузки всех товаров в каталоге
function loadAllProducts() {
    const productsGrid = document.querySelector('.catalog-products .products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const products = [
        { id: 1, name: 'Набор ковриков (серый)', price: 2490, color: 'gray', image: 'assets/images/product-gray.jpg' },
        { id: 2, name: 'Набор ковриков (белый)', price: 2490, color: 'white', image: 'assets/images/product-white.jpg' },
        { id: 3, name: 'Набор ковриков (черный)', price: 2490, color: 'black', image: 'assets/images/product-black.jpg' },
        { id: 4, name: 'Набор ковриков (синий)', price: 2490, color: 'blue', image: 'assets/images/product-blue.jpg' },
        { id: 5, name: 'Набор ковриков (зеленый)', price: 2490, color: 'green', image: 'assets/images/product-green.jpg' },
        { id: 6, name: 'Набор ковриков (красный)', price: 2490, color: 'red', image: 'assets/images/product-red.jpg' },
        { id: 7, name: 'Набор ковриков (бежевый)', price: 2490, color: 'beige', image: 'assets/images/product-beige.jpg' },
        { id: 8, name: 'Набор ковриков (коричневый)', price: 2490, color: 'brown', image: 'assets/images/product-brown.jpg' }
    ];
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-color', product.color);
        
        productCard.innerHTML = 
            '<div class="product-image">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
            '</div>' +
            '<div class="product-info">' +
                '<h3 class="product-title">' + product.name + '</h3>' +
                '<div class="product-price">' +
                    '<span class="current-price">' + product.price.toLocaleString() + ' ₽</span>' +
                '</div>' +
                '<a href="product-detail.html?id=' + product.id + '" class="btn btn-primary add-to-cart">Подробнее</a>' +
            '</div>';
        
        productsGrid.appendChild(productCard);
    });
}

// Функция загрузки похожих товаров
function loadRelatedProducts() {
    const productsGrid = document.querySelector('.related-products .products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const products = [
        { id: 2, name: 'Набор ковриков (белый)', price: 2490, color: 'white', image: 'assets/images/product-white.jpg' },
        { id: 3, name: 'Набор ковриков (черный)', price: 2490, color: 'black', image: 'assets/images/product-black.jpg' },
        { id: 4, name: 'Набор ковриков (синий)', price: 2490, color: 'blue', image: 'assets/images/product-blue.jpg' },
        { id: 5, name: 'Набор ковриков (зеленый)', price: 2490, color: 'green', image: 'assets/images/product-green.jpg' }
    ];
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-color', product.color);
        
        productCard.innerHTML = 
            '<div class="product-image">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
            '</div>' +
            '<div class="product-info">' +
                '<h3 class="product-title">' + product.name + '</h3>' +
                '<div class="product-price">' +
                    '<span class="current-price">' + product.price.toLocaleString() + ' ₽</span>' +
                '</div>' +
                '<a href="product-detail.html?id=' + product.id + '" class="btn btn-primary add-to-cart">Подробнее</a>' +
            '</div>';
        
        productsGrid.appendChild(productCard);
    });
}

// Анимации при прокрутке
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .method-card');
    
    // Проверяем поддержку IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Если не поддерживается, просто показываем элементы
        animateElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}