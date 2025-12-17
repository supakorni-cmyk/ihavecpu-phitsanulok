// File: public/script.js

// --- SLIDER HELPER FUNCTIONS ---
let slideIndex = 1;
function plusSlides(n) { showSlide(slideIndex += n); }
function currentSlide(n) { showSlide(slideIndex = n); }
function showSlide(n) {
    let i, slides = document.getElementsByClassName("slider-slide"), dots = document.getElementsByClassName("slider-dot");
    if (!slides.length || !dots.length) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGATION & GALLERY LOGIC ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => { navMenu.classList.toggle('active'); menuToggle.classList.toggle('active'); });
        navMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { navMenu.classList.remove('active'); menuToggle.classList.remove('active'); }); });
    }
    const mainGalleryImage = document.getElementById('main-gallery-image');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.querySelector('.close-modal');
    if (mainGalleryImage && galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => { thumb.addEventListener('click', () => { mainGalleryImage.src = thumb.src; galleryThumbs.forEach(t => t.classList.remove('active-thumb')); thumb.classList.add('active-thumb'); }); });
        mainGalleryImage.addEventListener('click', () => { modal.style.display = "block"; modalImage.src = mainGalleryImage.src; });
    }
    const closeModal = () => { if (modal) modal.style.display = "none"; }
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // --- BOOKING SYSTEM LOGIC ---
    const zoneTabsContainer = document.getElementById('zone-tabs');
    const summaryContent = document.getElementById('summary-content');
    let spotsData = {}, selection = [];

    const initializeApp = async () => {
        try {
            const response = await fetch('/api/spots');
            if (!response.ok) {
                // If API fails (404/500), throw to catch block
                throw new Error(`Server status: ${response.status}`);
            }

            spotsData = await response.json();

            // --- FIX: FALLBACK DATA ---
            // If API returns null/empty (fresh DB), use this default data so the app works.
            if (!spotsData || typeof spotsData !== 'object' || Object.keys(spotsData).length === 0) {
                console.warn("Spots data missing from API. Using Fallback Data.");
                spotsData = {
                    "exteriorLogo": {
                        name: "Exterior Logo",
                        layoutImages: ["images/exterior_logo.jpg"],
                        spots: {
                        "EX1": { 
                            name: "EX1", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '',
                        },
                        "EX2": { 
                            name: "EX2", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '',
                        },
                        "EX3": { 
                            name: "EX3", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX4": { 
                            name: "EX4", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX5": { 
                            name: "EX5", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX6": { 
                            name: "EX6", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX7": { 
                            name: "EX7", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX8": { 
                            name: "EX8", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX9": { 
                            name: "EX9", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX10": { 
                            name: "EX10", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX11": { 
                            name: "EX11", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX12": { 
                            name: "EX12", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX13": { 
                            name: "EX13", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX14": { 
                            name: "EX14", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "EX15": { 
                            name: "EX15", 
                            size: "1920x1080px", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        }
                    },
                    "exteriorSticker": {
                        name: "Exterior Sticker",
                        layoutImages: ['images/exterior_sticker.jpg'],
                        spots: {
                        "FST-1": { 
                            name: "FST-1", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "FST-2": { 
                            name: "FST-2", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "FST-3": { 
                            name: "FST-3", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "FST-4": { 
                            name: "FST-4", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "FST-5": { 
                            name: "FST-5", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        }
                    },
                    "interiorSticker": {
                        name: "Interior Sticker",
                        layoutImages: [
                        'images/ist1-2.jpg',
                        'images/ist3-4.jpg',
                        'images/ist5-6.jpg',
                        'images/ist7-8.jpg'
                        ],
                        spots: {
                        "IST-1": { 
                            name: "IST-1", 
                            size: "3m x 1.5m", 
                            price: 35000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-2": { 
                            name: "IST-2", 
                            size: "3m x 1.5m", 
                            price: 35000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-3": { 
                            name: "IST-3", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-4": { 
                            name: "IST-4", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-5": { 
                            name: "IST-5", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-6": { 
                            name: "IST-6", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-7": { 
                            name: "IST-7", 
                            size: "3m x 1.5m", 
                            price: 30000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "IST-8": { 
                            name: "IST-8", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        }
                    },
                    "interiorLogo": {
                        name: "Interior Logo",
                        layoutImages: [
                        'images/1.jpg',
                        'images/2.jpg',
                        'images/3.jpg',
                        ],
                        spots: {
                        "A1": { 
                            name: "A1 - CPU", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A2": { 
                            name: "A2 - CPU", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A3": { 
                            name: "A3 - Monitor", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A4": { 
                            name: "A4 - Monitor", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A5": { 
                            name: "A5 - Monitor", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A6": { 
                            name: "A6 - Monitor", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A7": { 
                            name: "A7 - Monitor", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A8": { 
                            name: "A8 - Accessories", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A9": { 
                            name: "A9 - Case & Cooling", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A10": { 
                            name: "A10 - Case & Cooling", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A11": { 
                            name: "A11 - Case & Cooling", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A12": { 
                            name: "A12 - Case & Cooling", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A13": { 
                            name: "A13 - Case & Cooling", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A14": { 
                            name: "A14 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A15": { 
                            name: "A15 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },
                        "A16": { 
                            name: "A16 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },     
                        "A17": { 
                            name: "A17 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A18": { 
                            name: "A18 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A19": { 
                            name: "A19 - DIY", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A20": { 
                            name: "A20 - Gaming Gear", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A21": { 
                            name: "A21 - Gaming Gear", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A22": { 
                            name: "A22 - Gaming Gear", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        "A23": { 
                            name: "A23 - Gaming Gear", 
                            size: "3m x 1.5m", 
                            price: 20000, 
                            status: 'Available', 
                            bookedBy: '', 
                        },  
                        }
                    }
                };
            }

            renderZoneTabs();
            
            // Safe access to keys
            const zoneKeys = Object.keys(spotsData);
            if (zoneKeys.length > 0) {
                renderZone(zoneKeys[0]);
            } else {
                const spotButtonsContainer = document.getElementById('spot-buttons-container');
                if (spotButtonsContainer) spotButtonsContainer.innerHTML = "<p>No spots currently available.</p>";
            }
            
            updateSelectionSummary();
        } catch (error) {
            console.error("Failed to initialize app:", error);
            const bookingContainer = document.querySelector('.booking-app-container');
            if(bookingContainer) bookingContainer.innerHTML = `<p class='error'>Could not load booking system. (${error.message})</p>`;
        }
    };

    const renderZoneTabs = () => {
        if(!zoneTabsContainer) return;
        zoneTabsContainer.innerHTML = '';
        for (const zoneId in spotsData) {
            const tab = document.createElement('div');
            tab.className = 'zone-tab';
            tab.dataset.zoneId = zoneId;
            tab.textContent = spotsData[zoneId].name;
            tab.addEventListener('click', () => renderZone(zoneId));
            zoneTabsContainer.appendChild(tab);
        }
    };
    
    const renderZone = (zoneId) => {
        const zoneImageContainer = document.getElementById('zone-image-container');
        const spotButtonsContainer = document.getElementById('spot-buttons-container');
        if (!zoneImageContainer || !spotButtonsContainer) return;
        
        const zone = spotsData[zoneId];
        if (!zone) return; // Guard clause

        document.querySelectorAll('.zone-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.zoneId === zoneId));

        if (zone.layoutImages && zone.layoutImages.length > 1) {
            let slidesHTML = '', dotsHTML = '';
            zone.layoutImages.forEach((imageUrl, index) => {
                slidesHTML += `<div class="slider-slide fade"><img src="${imageUrl}" alt="${zone.name} layout view ${index + 1}"></div>`;
                dotsHTML += `<span class="slider-dot" onclick="currentSlide(${index + 1})"></span>`;
            });
            const sliderHTML = `<div class="slider-container">${slidesHTML}<a class="slider-prev" onclick="plusSlides(-1)">❮</a><a class="slider-next" onclick="plusSlides(1)">❯</a><div class="slider-dots">${dotsHTML}</div></div>`;
            zoneImageContainer.innerHTML = sliderHTML;
            slideIndex = 1; showSlide(slideIndex);
        } else if (zone.layoutImages && zone.layoutImages.length === 1) {
            zoneImageContainer.innerHTML = `<div class="single-image-container"><img src="${zone.layoutImages[0]}" alt="${zone.name} layout"></div>`;
        } else {
            zoneImageContainer.innerHTML = '';
        }
        
        let buttonsHTML = '';
        if (zone.spots) {
            for (const spotId in zone.spots) {
                const spot = zone.spots[spotId];
                const isBooked = spot.status === 'Booked';
                const isSelected = selection.some(s => s.spotId === spotId && s.zoneId === zoneId);
                let buttonClass = 'spot-button';
                if (isBooked) buttonClass += ' booked';
                else if (isSelected) buttonClass += ' selected';
                else buttonClass += ' available';
                buttonsHTML += `<button class="${buttonClass}" data-zone-id="${zoneId}" data-spot-id="${spotId}" ${isBooked ? 'disabled' : ''}>${spot.name}</button>`;
            }
        }
        spotButtonsContainer.innerHTML = buttonsHTML;
        attachSpotListeners();
    };

    const attachSpotListeners = () => {
        document.querySelectorAll('.spot-button:not(.booked)').forEach(button => {
            button.addEventListener('click', () => {
                const { zoneId, spotId } = button.dataset;
                handleSpotClick(zoneId, spotId);
            });
        });
    };

    const handleSpotClick = (zoneId, spotId) => {
        const selectionIndex = selection.findIndex(s => s.spotId === spotId && s.zoneId === zoneId);
        if (selectionIndex > -1) selection.splice(selectionIndex, 1);
        else selection.push({ zoneId, spotId });
        const activeTab = document.querySelector('.zone-tab.active');
        if (activeTab) {
            renderZone(activeTab.dataset.zoneId); 
        }
        updateSelectionSummary();
    };
    
    // --- SUMMARY FORM WITH NEW FIELDS ---
    const updateSelectionSummary = () => {
        if(!summaryContent) return;
        const numSelected = selection.length;
        if (numSelected === 0) {
            summaryContent.innerHTML = '<p>Select one or more available positions to begin.</p>';
            return;
        }
        let listHTML = '<ul>', subtotal = 0;
        selection.forEach(item => {
            if (spotsData[item.zoneId] && spotsData[item.zoneId].spots[item.spotId]) {
                const spot = spotsData[item.zoneId].spots[item.spotId];
                listHTML += `<li><span>${spot.name}</span><strong>${spot.price.toLocaleString()} THB</strong></li>`;
                subtotal += spot.price;
            }
        });
        listHTML += '</ul>';
        let discountAmount = 0;
        if (numSelected === 2) discountAmount = 5000;
        else if (numSelected >= 3) discountAmount = 10000;
        const finalTotal = subtotal - discountAmount;
        let summaryHTML = `<div class="summary-details"><h4>Selected Items</h4>${listHTML}<div class="summary-calculation"><div class="summary-row"><span>Subtotal</span><span>${subtotal.toLocaleString()} THB</span></div>`;
        if (discountAmount > 0) {
            summaryHTML += `<div class="summary-row discount"><span>Discount</span><span>-${discountAmount.toLocaleString()} THB</span></div>`;
        }
        summaryHTML += `</div><div id="summary-total"><span>Total</span><span>${finalTotal.toLocaleString()} THB</span></div></div>`;
        
        const formHTML = `
        <form class="booking-form" id="summary-form">
            <label for="name">Name *</label>
            <input type="text" id="name" required placeholder="Your Name">

            <label>Brand / Distributor *</label>

            <label for="brand">Company Name *</label>
            <input type="text" id="brand" required placeholder="Your Company Name">

            <label for="email">Email *</label>
            <input type="email" id="email" required placeholder="name@example.com">

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="08x-xxx-xxxx">

            <label for="cc">CC Emails (optional)</label>
            <input type="text" id="cc" placeholder="email1@example.com, email2@example.com">

            <button type="submit">Book Selected Positions</button>
            <div id="status-message"></div>
        </form>`;

        summaryContent.innerHTML = summaryHTML + formHTML;
        document.getElementById('summary-form').addEventListener('submit', handleBookingSubmit);
    };
    
    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const brandInput = document.getElementById('brand');
        const phoneInput = document.getElementById('phone');
        const ccInput = document.getElementById('cc');
        const statusMessage = document.getElementById('status-message');

        if (selection.length === 0) {
            statusMessage.className = 'status-message error';
            statusMessage.textContent = "Please select at least one position.";
            return;
        }
        if (!nameInput.value || !brandInput.value || !emailInput.value) {
            statusMessage.className = 'status-message error';
            statusMessage.textContent = "Please fill in all required fields.";
            return;
        }

        const bookingData = { 
            spotIds: selection, 
            name: nameInput.value,
            email: emailInput.value, 
            brand: brandInput.value,
            phone: phoneInput.value,
            ccEmails: ccInput.value 
        };
        
        try {
            const response = await fetch('/api/book', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookingData) });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                selection = [];
                initializeApp();
            } else {
                statusMessage.className = 'status-message error';
                statusMessage.textContent = result.message;
            }
        } catch (error) {
            statusMessage.className = 'status-message error';
            statusMessage.textContent = "A network error occurred.";
        }
    };

    initializeApp();
});