// script.js

// ========== Telegram (заглушка, если файл не подключён) ==========
if (typeof window.sendTelegramMessage === 'undefined') {
    window.sendTelegramMessage = function(message) {
        console.warn('Telegram не подключён, сообщение:', message);
        alert('Демо-режим: заказ не отправлен. Проверьте telegram.js');
    };
}

// ========== ПОЛНЫЙ КАТАЛОГ ТОВАРОВ (из вашего файла) ==========
const products = [
    // Вермут
    { id: 1, name: 'ВЕРМУТ CINZANO BIANCO 1,0 ЛИТРА', price: 2429, category: 'vermut', inStock: true },
    { id: 2, name: 'ВЕРМУТ MARTINI EXTRA DRY белый сухой 0,75 ЛИТРА', price: 2190, category: 'vermut', inStock: true },
    { id: 3, name: 'ВЕРМУТ MARTINI FIERO 1 ЛИТРА + Schweppes 1 ЛИТРА', price: 2449, category: 'vermut', inStock: false },
    { id: 4, name: 'ВЕРМУТ GANCIA BIANCO 0,5 ЛИТРА', price: 990, category: 'vermut', inStock: true },
    { id: 5, name: 'ВЕРМУТ CINZANO BIANCO белое сладкое 0,5 ЛИТРА', price: 1829, category: 'vermut', inStock: true },
    { id: 6, name: 'ВЕРМУТ MARTINI BIANCO 0,75 ЛИТРА', price: 2099, category: 'vermut', inStock: true },
    // Вино
    { id: 7, name: 'ВИНО COMTE DE MARIAC красное полусладкое 0,7 ЛИТРА', price: 1190, category: 'vino', inStock: true },
    { id: 8, name: 'ВИНО C’ERA UNA VOLTA PINOT GRIGIO белое сухое 0,75 ЛИТРА', price: 1549, category: 'vino', inStock: true },
    { id: 9, name: 'ВИНО COMTE DE MARIAC белое сухое 0,7 ЛИТРА', price: 1190, category: 'vino', inStock: true },
    { id: 10, name: 'ВИНО CHIANTI DOCG красное сухое 0,75 ЛИТРА', price: 1850, category: 'vino', inStock: true },
    { id: 11, name: 'ВИНО COMTE DE MARIAC белое полусладкое 0,7 ЛИТРА', price: 1190, category: 'vino', inStock: true },
    { id: 12, name: 'ВИНО MANCURA SAUVIGNON BLANC белое сухое 0,75 ЛИТРА', price: 1429, category: 'vino', inStock: true },
    { id: 13, name: 'ВИНО VINEDOS SANTA LUCIA SAUVIGNON BLANC белое сухое 0,75 ЛИТРА', price: 1529, category: 'vino', inStock: true },
    { id: 14, name: 'ВИНО КИНДЗМАРАУЛИ красное полусладкое 0,75 ЛИТРА', price: 1349, category: 'vino', inStock: true },
    { id: 15, name: 'ВИНО Gewurztraminer белое полусладкое 0,75 ЛИТРА', price: 1599, category: 'vino', inStock: true },
    { id: 16, name: 'ВИНО MARE ALTA VINHO VERDE белое полусухое 0,7 ЛИТРА', price: 1490, category: 'vino', inStock: true },
    { id: 17, name: 'ВИНО MANCURA CABERNET красное сухое 0,75 ЛИТРА', price: 1429, category: 'vino', inStock: false },
    { id: 18, name: 'ВИНО COMTE DE MARIAC красное сухое 0,7 ЛИТРА', price: 1190, category: 'vino', inStock: true },
    { id: 19, name: 'Вино Кампо Вента Дон Хуан Тиерра де Кастилья белое сухое 0.75 ЛИТРА', price: 1490, category: 'vino', inStock: true },
    { id: 20, name: 'ВИНО ИГРИСТОЕ INKERMAN ROSE полусладкое 0,75 ЛИТРА', price: 1490, category: 'vino', inStock: true },
    { id: 21, name: 'ВИНО PINOT NOIR красное сухое 0,75 ЛИТРА', price: 1800, category: 'vino', inStock: true },
    { id: 22, name: 'ВИНО INKERMAN МУСКАТ белое полусладкое 0,75 ЛИТРА', price: 1390, category: 'vino', inStock: true },
    // Виски
    { id: 23, name: 'ВИСКИ BALLANTINE’s 1,0 ЛИТРА', price: 4249, category: 'viski', inStock: true },
    { id: 24, name: 'WHITE HORSE 0,5 ЛИТРА', price: 1890, category: 'viski', inStock: true },
    { id: 25, name: 'ВИСКИ BELL’S 0,5 ЛИТРА', price: 1890, category: 'viski', inStock: true },
    { id: 26, name: 'ВИСКИ WILLIAM LAWSON’S 0,7 ЛИТРА', price: 2429, category: 'viski', inStock: true },
    { id: 27, name: 'ВИСКИ BELL’S 1,0 ЛИТРА', price: 2849, category: 'viski', inStock: true },
    { id: 28, name: 'ВИСКИ BALLANTINE’s 0,5 ЛИТРА', price: 3249, category: 'viski', inStock: true },
    { id: 29, name: 'ВИСКИ JAMESON 0,5 ЛИТРА', price: 2999, category: 'viski', inStock: true },
    { id: 30, name: 'ВИСКИ JACK DANIEL’S 0,7 ЛИТРА', price: 4590, category: 'viski', inStock: true },
    { id: 31, name: 'ВИСКИ JOHNNIE WALKER RED LABEL 0,5 ЛИТРА', price: 2490, category: 'viski', inStock: true },
    { id: 32, name: 'ВИСКИ JIM BEAM 0,5 ЛИТРА', price: 2849, category: 'viski', inStock: true },
    { id: 33, name: 'ВИСКИ WILLIAM LAWSON’S 1,0 ЛИТРА', price: 2790, category: 'viski', inStock: true },
    { id: 34, name: 'ВИСКИ JAMESON 0,7 ЛИТРА', price: 4290, category: 'viski', inStock: true },
    { id: 35, name: 'ВИСКИ JIM BEAM APPLE 0,7 ЛИТРА', price: 4029, category: 'viski', inStock: true },
    { id: 36, name: 'ВИСКИ JOHNNIE WALKER RED LABEL 0,7 ЛИТРА', price: 2949, category: 'viski', inStock: true },
    { id: 37, name: 'ВИСКИ BELL’s SPICED 0,7 ЛИТРА', price: 2490, category: 'viski', inStock: true },
    { id: 38, name: 'ВИСКИ JAMESON 1,0 ЛИТРА', price: 5999, category: 'viski', inStock: true },
    // Водка
    { id: 39, name: 'ВОДКА 5 ОЗЕР 0,7 ЛИТРА', price: 1300, category: 'vodka', inStock: true },
    { id: 40, name: 'ВОДКА ABSOLUT 0,75 ЛИТРА', price: 3229, category: 'vodka', inStock: true },
    { id: 41, name: 'ВОДКА 5 ОЗЕР 0,5 ЛИТРА', price: 929, category: 'vodka', inStock: true },
    { id: 42, name: 'ВОДКА ABSOLUT 0.5 ЛИТРА', price: 2599, category: 'vodka', inStock: true },
    { id: 43, name: 'ВОДКА РУССКИЙ СТАНДАРТ 0,7 ЛИТРА', price: 1749, category: 'vodka', inStock: true },
    { id: 44, name: 'ВОДКА РУССКИЙ СТАНДАРТ 0,5 ЛИТРА', price: 1290, category: 'vodka', inStock: true },
    { id: 45, name: 'ВОДКА ЖУРАВЛИ 0,5 ЛИТРА', price: 979, category: 'vodka', inStock: true },
    { id: 46, name: 'ВОДКА ЗЕЛЕНАЯ МАРКА 0,5 ЛИТРА', price: 990, category: 'vodka', inStock: true },
    { id: 47, name: 'ВОДКА ТАЛКА 0,5 ЛИТРА', price: 949, category: 'vodka', inStock: true },
    { id: 48, name: 'ВОДКА NEMIROFF 0,5 ЛИТРА', price: 749, category: 'vodka', inStock: true },
    { id: 49, name: 'ВОДКА ХОРТИЦА 0,7 ЛИТРА', price: 1249, category: 'vodka', inStock: true },
    { id: 50, name: 'ВОДКА ХОРТИЦА 0,5 ЛИТРА', price: 949, category: 'vodka', inStock: true },
    { id: 51, name: 'ВОДКА NEMIROFF ПЕРЕЦ 0,5 ЛИТРА', price: 799, category: 'vodka', inStock: true },
    { id: 52, name: 'ВОДКА ЦАРСКАЯ 0,5 ЛИТРА', price: 1249, category: 'vodka', inStock: true },
    { id: 53, name: 'ВОДКА ЦАРСКАЯ 0,7 ЛИТРА', price: 1629, category: 'vodka', inStock: true },
    { id: 54, name: 'НАСТОЙКА NEMIROFF КЛЮКВА 0,5 ЛИТРА', price: 749, category: 'vodka', inStock: true },
    // Джин
    { id: 55, name: 'ДЖИН BEEFEATER 0,7 ЛИТРА', price: 3890, category: 'dzhin', inStock: true },
    { id: 56, name: 'ДЖИН GORDON’S 0,7 ЛИТРА', price: 3149, category: 'dzhin', inStock: false },
    { id: 57, name: 'ДЖИН TANQUERAY LONDON DRY 1,0 ЛИТРА', price: 3749, category: 'dzhin', inStock: true },
    // Коньяк
    { id: 58, name: 'КОНЬЯК СТАРЫЙ КЕНИНГСБЕРГ 4 года 0,5 ЛИТРА', price: 1499, category: 'konyak', inStock: true },
    { id: 59, name: 'КОНЬЯК Дару-Бенд 5 лет 0,5 ЛИТРА', price: 1290, category: 'konyak', inStock: true },
    { id: 60, name: 'КОНЬЯК DAVID IVERELI 7 лет 0,5 ЛИТРА', price: 1790, category: 'konyak', inStock: false },
    { id: 61, name: 'КОНЬЯК КОЧАРИ 3 года 0,5 ЛИТРА', price: 1099, category: 'konyak', inStock: true },
    { id: 62, name: 'КОНЬЯК АРАРАТ 3 года 0,5 ЛИТРА', price: 2190, category: 'konyak', inStock: true },
    { id: 63, name: 'КОНЬЯК АРАРАТ 3 года 0,7 ЛИТРА', price: 2590, category: 'konyak', inStock: true },
    { id: 64, name: 'КОНЬЯК НОЙ 3 ГОДА 0,5 ЛИТРА', price: 1950, category: 'konyak', inStock: true },
    { id: 65, name: 'КОНЬЯК A. DE FUSSIGNY SELECTION 0,5 ЛИТРА', price: 2990, category: 'konyak', inStock: true },
    { id: 66, name: 'Коньяк Кочари 5 лет 0,5 л', price: 1390, category: 'konyak', inStock: true },
    { id: 67, name: 'КОНЬЯК АРАРАТ 5 ЗВЕЗД 0,5 ЛИТРА', price: 2489, category: 'konyak', inStock: true },
    { id: 68, name: 'КОНЬЯК АРАРАТ 5 звезд 0,7 ЛИТРА', price: 3090, category: 'konyak', inStock: true },
    { id: 69, name: 'КОНЬЯК HENNESSY VS 0,7 ЛИТРА', price: 7990, category: 'konyak', inStock: true },
    { id: 70, name: 'КОНЬЯК COURVOISIER VS 0,7 ЛИТРА', price: 8390, category: 'konyak', inStock: true },
    { id: 71, name: 'КОНЬЯК HENNESSY VSOP 0,7 ЛИТРА', price: 12990, category: 'konyak', inStock: false },
    { id: 72, name: 'КОНЬЯК REMY MARTIN SUPERIEUR VS 0,7 ЛИТРА', price: 9290, category: 'konyak', inStock: true },
    { id: 73, name: 'КОНЬЯК COURVOISIER VSOP 0,7 ЛИТРА', price: 9190, category: 'konyak', inStock: true },
    // Ликёр
    { id: 74, name: 'ЛИКЕР JAGERMEISTERP 0,7 ЛИТРА', price: 3549, category: 'liker', inStock: true },
    { id: 75, name: 'ЛИКЕР ЛИМОНЧЕЛЛО 0,5 ЛИТРА', price: 1249, category: 'liker', inStock: true },
    { id: 76, name: 'ЛИКЕР BAILEYS 0,7 ЛИТРА', price: 3149, category: 'liker', inStock: true },
    { id: 77, name: 'ЛИКЕР КСУ-КСУ XUXU 0,7 ЛИТРА', price: 1990, category: 'liker', inStock: true },
    { id: 78, name: 'Aperol 1,0 ЛИТР', price: 3290, category: 'liker', inStock: true },
    { id: 79, name: 'ЛИКЕР SHERIDAN’S 0,5 ЛИТРА', price: 3429, category: 'liker', inStock: true },
    { id: 80, name: 'ЛИКЕР SAMBUCA 0,5 ЛИТРА', price: 1549, category: 'liker', inStock: true },
    { id: 81, name: 'ЛИКЕР BECHEROVKA 0,7 ЛИТРА', price: 3129, category: 'liker', inStock: true },
    { id: 82, name: 'ЛИКЕР COINTREAU 0,7 ЛИТРА', price: 3549, category: 'liker', inStock: true },
    // Пиво
    { id: 83, name: 'ПИВО BUD 0,45 ЛИТРА', price: 169, category: 'pivo', inStock: true },
    { id: 84, name: 'ПИВО KRUSOVICE 0,5 ЛИТРА', price: 169, category: 'pivo', inStock: true },
    { id: 85, name: 'ПИВО ОХОТА КРЕПКОЕ 0,45 ЛИТРА', price: 149, category: 'pivo', inStock: true },
    { id: 86, name: 'ПИВО Tuborg green 0,5 ЛИТРА', price: 169, category: 'pivo', inStock: true },
    { id: 87, name: 'ПИВО KOZEL СВЕТЛОЕ 0,45 ЛИТРА', price: 169, category: 'pivo', inStock: true },
    { id: 88, name: 'ПИВО CORONA EXTRA 0,33 ЛИТРА', price: 289, category: 'pivo', inStock: true },
    { id: 89, name: 'ПИВО ШПАТЕН 0,45 ЛИТРА', price: 299, category: 'pivo', inStock: true },
    { id: 90, name: 'ПИВО HOEGAARDEN 0,5 ЛИТРА', price: 239, category: 'pivo', inStock: true },
    { id: 91, name: 'ПИВO KOZEL ТЕМНОЕ 0,45 ЛИТРА', price: 169, category: 'pivo', inStock: true },
    { id: 92, name: 'ПИВО КРОНЕНБУРГ 1664 Blanco 0,5 ЛИТРА', price: 199, category: 'pivo', inStock: true },
    { id: 93, name: 'ПИВО MILLER 0,45 ЛИТРА', price: 199, category: 'pivo', inStock: true },
    { id: 94, name: 'ПИВО REDD’S яблочный 0,33 ЛИТРА', price: 179, category: 'pivo', inStock: true },
    // Ром
    { id: 95, name: 'РОМ CAPITAN MORGAN SPICED GOLD 0,5 ЛИТРА', price: 2190, category: 'rom', inStock: false },
    { id: 96, name: 'РОМ BACARDI черный 0,5 ЛИТРА', price: 2599, category: 'rom', inStock: false },
    { id: 97, name: 'РОМ BACARDI белый 0,7 ЛИТРА', price: 2999, category: 'rom', inStock: false },
    { id: 98, name: 'РОМ BACARDI белый 0,5 ЛИТРА', price: 2499, category: 'rom', inStock: true },
    { id: 99, name: 'Barcelo Dorado 0.7', price: 2790, category: 'rom', inStock: true },
    { id: 100, name: 'РОМ HAVANA CLUB ANEJO ESPECIAL 3 года 0,7 ЛИТРА', price: 3390, category: 'rom', inStock: true },
    { id: 101, name: 'Barcelo Gran Anejo Dark 0.7', price: 2790, category: 'rom', inStock: false },
    { id: 102, name: 'РОМ CAPITAN MORGAN WHITE 0,5 ЛИТРА', price: 2190, category: 'rom', inStock: true },
    { id: 103, name: 'РОМ CAPITAN MORGAN SPICED GOLD 0,7 ЛИТРА', price: 3900, category: 'rom', inStock: true },
    { id: 104, name: 'Barcelo Blanco 0,7 л', price: 2790, category: 'rom', inStock: true },
    // Сигареты
    { id: 105, name: 'СИГАРЕТЫ ПАРЛАМЕНТ PARLAMENT АQUA BLUE', price: 450, category: 'sigarety', inStock: true, image: 'https://alkotaxi24.vercel.app/photo/parlament.jpg' },
    { id: 106, name: 'СИГАРЕТЫ MARLBORO с кнопкой', price: 400, category: 'sigarety', inStock: true },
    { id: 107, name: 'СИГАРЕТЫ КРАСНЫЕ MARLBORO RED', price: 420, category: 'sigarety', inStock: true },
    { id: 108, name: 'СИГАРЕТЫ КЕНТ KENT BLUE FUTURA', price: 400, category: 'sigarety', inStock: true },
    { id: 109, name: 'СИГАРЕТЫ КЕНТ KENT NANO SILVER', price: 400, category: 'sigarety', inStock: true },
    { id: 110, name: 'СИГАРЕТЫ ВОГ VOGUE MENTHE', price: 360, category: 'sigarety', inStock: true },
    { id: 111, name: 'ВОДА КОКА-КОЛА COCA-COLA 2 ЛИТРА', price: 360, category: 'sigarety', inStock: true },
    { id: 112, name: 'СИГАРЕТЫ ВИНСТОН WINSTON X-STYLE BLU', price: 360, category: 'sigarety', inStock: true },
    { id: 113, name: 'СИГАРЕТЫ ВИНСТОН WINSTON BLUE', price: 360, category: 'sigarety', inStock: true },
    { id: 114, name: 'СИГАРЕТЫ КЕНТ KENT SILVER NEO 4', price: 400, category: 'sigarety', inStock: true },
    { id: 115, name: 'ВОДА АКВА AQUA MINERALE с газом 0,5 ЛИТРА', price: 120, category: 'sigarety', inStock: true },
    { id: 116, name: 'ВОДА BORJOMI 0,5 ЛИТРА', price: 220, category: 'sigarety', inStock: true },
    { id: 117, name: 'ВОДА АКВА AQUA MINERALE негаз. 0,5 ЛИТРА', price: 120, category: 'sigarety', inStock: true },
    { id: 118, name: 'ВОДА SCHWEPPES INDIAN TONIC 1 ЛИТРА', price: 250, category: 'sigarety', inStock: true },
    { id: 119, name: 'ЗАЖИГАЛКА', price: 100, category: 'sigarety', inStock: true },
    { id: 120, name: 'СОК RICH Яблоко 1,0 ЛИТРА', price: 350, category: 'sigarety', inStock: true },
    // Текила
    { id: 121, name: 'ТЕКИЛА SAUZA BLANCO 0,7 ЛИТРА', price: 2590, category: 'tekila', inStock: true },
    { id: 122, name: 'ТЕКИЛА OLMECA GOLD 0,7 ЛИТРА', price: 2890, category: 'tekila', inStock: true },
    { id: 123, name: 'ТЕКИЛА JOSE CUERVO ESPECIAL REPOSADO 0,7 ЛИТРА', price: 3190, category: 'tekila', inStock: true },
    // Шампанское
    { id: 124, name: 'ШАМПАНСКОЕ ABRAU DURSO BRUT (РОССИЯ) 0,75 ЛИТРА', price: 1290, category: 'shampanskoe', inStock: true },
    { id: 125, name: 'ШАМПАНСКОЕ РОССИЙСКОЕ белое полусладкое (РОССИЯ) 0,75 ЛИТРА', price: 790, category: 'shampanskoe', inStock: true },
    { id: 126, name: 'Вино игристое Риондо Просекко Фризанте белое сухое 0,75 л', price: 1690, category: 'shampanskoe', inStock: true },
    { id: 127, name: 'ШАМПАНСКОЕ Gancia Prosecco (ИТАЛИЯ) 0,7 ЛИТРА', price: 2390, category: 'shampanskoe', inStock: true },
    { id: 128, name: 'ВИНО ИГРИСТОЕ INKERMAN ROSE полусладкое 0,75 ЛИТРА', price: 1490, category: 'shampanskoe', inStock: true },
    { id: 129, name: 'ШАМПАНСКОЕ ASTI MONDORO DOCG белое сладкое (ИТАЛИЯ) 0,75 ЛИТРА', price: 2390, category: 'shampanskoe', inStock: true },
    { id: 130, name: 'ШАМПАНСКОЕ АБРАУ ДЮРСО полусладкое (РОССИЯ) 0,75 ЛИТРА', price: 1149, category: 'shampanskoe', inStock: true },
    { id: 131, name: 'ШАМПАНСКОЕ MONDORO BRUT (ИТАЛИЯ) 0,75 ЛИТРА', price: 2390, category: 'shampanskoe', inStock: true },
    { id: 132, name: 'ВИНО ИГРИСТОЕ INKERMAN белое сухое 0.,75 ЛИТРА', price: 1490, category: 'shampanskoe', inStock: true },
    { id: 133, name: 'ИГРИСТОЕ ВИНО ISSI MALVASIA SPUMANTE белое сладкое 0,75 ЛИТРА', price: 1290, category: 'shampanskoe', inStock: true },
    { id: 134, name: 'ШАМПАНСКОЕ MARTINI ASTI (ИТАЛИЯ) 0,75 ЛИТРА', price: 2590, category: 'shampanskoe', inStock: true },
    { id: 135, name: 'ВИНО MASSIMO VISCONTI LAMBRUSCO белое сладкое 0,75 ЛИТРА', price: 1099, category: 'shampanskoe', inStock: true },
    { id: 136, name: 'ШАМПАНСКОЕ CINZANO PROSECCO белое сухое (ИТАЛИЯ) 0,75 ЛИТРА', price: 2549, category: 'shampanskoe', inStock: true },
    { id: 137, name: 'ВИНО ИГРИСТОЕ MASSIMO VISCONTI LAMBRUSCO ROSSO DOLCE красное сладкое 0,75 ЛИТРА', price: 1099, category: 'shampanskoe', inStock: true },
    { id: 138, name: 'ШАМПАНСКОЕ BOSCAбелое полу-сладкое (ЛИТВА) 0,75 ЛИТРА', price: 1290, category: 'shampanskoe', inStock: true },
    { id: 139, name: 'ШАМПАНСКОЕ ABRAU Light полусладкое (РОССИЯ) 0,75 ЛИТРА', price: 1090, category: 'shampanskoe', inStock: true },
];

// ========== СОСТОЯНИЕ ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== ЭЛЕМЕНТЫ DOM ==========
const mainContent = document.getElementById('main-content');
const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('overlay');
const cartCountSpan = document.getElementById('cart-count');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const orderForm = document.getElementById('order-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    showMainPage();
    updateCartUI();
    attachMenuListeners();
    attachCartListeners();
    attachSearchListener();
    attachOrderFormListener();
});

// ========== СЛУШАТЕЛИ ==========
function attachMenuListeners() {
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page === 'main') {
                showMainPage();
            } else {
                showCategoryPage(page);
            }
            highlightActiveMenu(page);
        });
    });
}

function attachCartListeners() {
    document.getElementById('cart-toggle').addEventListener('click', (e) => {
        e.preventDefault();
        cartPanel.classList.add('open');
        overlay.classList.add('show');
    });
    document.getElementById('close-cart').addEventListener('click', () => {
        cartPanel.classList.remove('open');
        overlay.classList.remove('show');
    });
    overlay.addEventListener('click', () => {
        cartPanel.classList.remove('open');
        overlay.classList.remove('show');
    });
}

function attachSearchListener() {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function attachOrderFormListener() {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitCartOrder();
    });
}

// ========== ПОДСВЕТКА МЕНЮ ==========
function highlightActiveMenu(page) {
    document.querySelectorAll('.menu-list a').forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== ПОКАЗ ГЛАВНОЙ ==========
function showMainPage() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    const mainPage = document.getElementById('page-main');
    if (mainPage) mainPage.classList.add('active-page');

    // Вставляем текст из siteTexts.main в блок #main-seo
    const seoDiv = document.getElementById('main-seo');
    if (seoDiv && typeof siteTexts !== 'undefined') {
        seoDiv.innerHTML = siteTexts.main;
    } else {
        console.warn('siteTexts не найден. Убедитесь, что файл texts.js подключён.');
    }

    // Обновляем хиты (например, первые 6 товаров)
    const hits = products.filter(p => p.category === 'vermut' && p.inStock).slice(0, 6);
    const grid = document.getElementById('main-products');
    if (grid) grid.innerHTML = renderProductGrid(hits);
    attachAddToCartHandlers();
}

// ========== ПОКАЗ КАТЕГОРИИ ==========
function showCategoryPage(categoryKey) {
    // Удаляем все существующие страницы, кроме главной
    document.querySelectorAll('.page').forEach(p => {
        if (p.id !== 'page-main') p.remove();
    });
    const mainPage = document.getElementById('page-main');
    if (mainPage) mainPage.classList.remove('active-page');

    // Создаём страницу категории
    const pageDiv = document.createElement('div');
    pageDiv.id = `page-${categoryKey}`;
    pageDiv.className = 'page active-page';

    // Русское название категории
    const catNames = {
        vermut: 'Вермут', vino: 'Вино', viski: 'Виски', vodka: 'Водка',
        dzhin: 'Джин', konyak: 'Коньяк', liker: 'Ликёр', pivo: 'Пиво',
        rom: 'Ром', sigarety: 'Сигареты', tekila: 'Текила', shampanskoe: 'Шампанское'
    };
    const title = catNames[categoryKey] || categoryKey;

    // Берём текст для категории из siteTexts, если есть, иначе заглушка
    let categoryText = '';
    if (typeof siteTexts !== 'undefined' && siteTexts[categoryKey]) {
        categoryText = siteTexts[categoryKey];
    } else {
        categoryText = `<h2>${title}</h2><p>Текст для этой категории появится позже.</p>`;
        console.warn(`Текст для категории ${categoryKey} не найден в siteTexts`);
    }

    pageDiv.innerHTML = `
        <div class="category-header">
            <h1>${title}</h1>
        </div>
        <div class="product-grid" id="category-products-${categoryKey}"></div>
        <div class="seo-text">${categoryText}</div>
        <div class="order-form-block">
            <h3>Оставить заявку</h3>
            <form class="quick-order-form" data-page="${categoryKey}">
                <input type="text" placeholder="Ваше имя" class="quick-name" required>
                <input type="tel" placeholder="Телефон" class="quick-phone" required>
                <button type="submit">Отправить заявку</button>
            </form>
            <div class="order-message"></div>
        </div>
    `;

    mainContent.appendChild(pageDiv);

    // Заполняем товарами
    const catProducts = products.filter(p => p.category === categoryKey);
    const grid = document.getElementById(`category-products-${categoryKey}`);
    grid.innerHTML = renderProductGrid(catProducts);

    attachAddToCartHandlers();

    // Обработчик быстрой заявки
    const quickForm = pageDiv.querySelector('.quick-order-form');
    quickForm.addEventListener('submit', handleQuickOrder);
}

// ========== РЕНДЕР СЕТКИ ТОВАРОВ ==========
function renderProductGrid(productsArray) {
    if (!productsArray.length) return '<p>Товары временно отсутствуют</p>';
    return productsArray.map(p => {
        const inStock = p.inStock !== false;
        return `
            <div class="product-card" data-id="${p.id}">
                <img class="product-img" src="${p.image || 'https://via.placeholder.com/200x150?text=Alko'}" alt="${p.name}" loading="lazy">
                <div class="product-title">${p.name}</div>
                <div class="product-price">${p.price} ₽</div>
                ${inStock ? 
                    `<button class="add-to-cart" data-id="${p.id}"><i class="fas fa-cart-plus"></i> В корзину</button>` : 
                    `<div style="color: red; font-weight: bold; margin-top: 10px;">Нет в наличии</div>`}
            </div>
        `;
    }).join('');
}

// ========== ДОБАВЛЕНИЕ В КОРЗИНУ ==========
function attachAddToCartHandlers() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.removeEventListener('click', addToCartHandler);
        btn.addEventListener('click', addToCartHandler);
    });
}

function addToCartHandler(e) {
    const productId = parseInt(e.currentTarget.dataset.id);
    const product = products.find(p => p.id === productId);
    if (product && product.inStock !== false) {
        addToCart(product);
    }
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCountSpan.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function updateCartUI() {
    cartCountSpan.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (!cartItemsDiv) return;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
        cartTotalSpan.textContent = 'Итого: 0 ₽';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div>${item.price} ₽ x ${item.quantity}</div>
                </div>
                <span class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></span>
            </div>
        `;
    });
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = `Итого: ${total} ₽`;
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            removeFromCart(id);
        });
    });
}

// ========== ОФОРМЛЕНИЕ ЗАКАЗА ==========
function submitCartOrder() {
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const comment = document.getElementById('order-comment').value.trim();

    if (!name || !phone || !address) {
        alert('Заполните имя, телефон и адрес');
        return;
    }
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }

    let itemsList = '';
    let total = 0;
    cart.forEach(item => {
        itemsList += `${item.name} x ${item.quantity} = ${item.price * item.quantity} ₽\n`;
        total += item.price * item.quantity;
    });

    const message = `🛒 НОВЫЙ ЗАКАЗ\n\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}\nКомментарий: ${comment || 'нет'}\n\nТовары:\n${itemsList}\nИтого: ${total} ₽`;

    sendTelegramMessage(message);
    alert('Заказ отправлен! Ожидайте звонка.');

    cart = [];
    saveCart();
    updateCartUI();
    orderForm.reset();
    cartPanel.classList.remove('open');
    overlay.classList.remove('show');
}

// ========== БЫСТРЫЙ ЗАКАЗ ==========
function handleQuickOrder(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.querySelector('.quick-name').value.trim();
    const phone = form.querySelector('.quick-phone').value.trim();
    const page = form.dataset.page;

    if (!name || !phone) {
        alert('Введите имя и телефон');
        return;
    }

    const message = `⚡ БЫСТРЫЙ ЗАКАЗ (${page})\nИмя: ${name}\nТелефон: ${phone}`;
    sendTelegramMessage(message);

    const msgDiv = form.parentElement.querySelector('.order-message');
    msgDiv.textContent = 'Заявка отправлена! Скоро перезвоним.';
    setTimeout(() => msgDiv.textContent = '', 5000);
    form.reset();
}

// ========== ПОИСК ==========
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const results = products.filter(p => p.name.toLowerCase().includes(query));

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    let mainPage = document.getElementById('page-main');
    if (mainPage) mainPage.classList.add('active-page');

    const grid = document.getElementById('main-products');
    grid.innerHTML = results.length ? renderProductGrid(results) : '<p>Ничего не найдено</p>';

    const seoDiv = document.getElementById('main-seo');
    if (seoDiv) seoDiv.style.display = 'none';

    const header = document.querySelector('#page-main .category-header h1');
    if (header) header.textContent = `Результаты поиска: "${searchInput.value}"`;

    attachAddToCartHandlers();
    highlightActiveMenu('main');

}
