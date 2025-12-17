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
                    "zone1": {
                        "name": "Zone A (Inside)",
                        "layoutImages": ["images/zone1_layout.jpg"], // Ensure these images exist in public/images/
                        "spots": {
                            "A1": { "name": "A1", "price": 35000, "status": "Available" },
                            "A2": { "name": "A2", "price": 35000, "status": "Available" },
                            "A3": { "name": "A3", "price": 35000, "status": "Available" },
                            "A4": { "name": "A4", "price": 35000, "status": "Available" },
                            "A5": { "name": "A5", "price": 35000, "status": "Available" },
                            "A6": { "name": "A6", "price": 35000, "status": "Available" },
                            "A7": { "name": "A7", "price": 35000, "status": "Available" },
                            "A8": { "name": "A8", "price": 35000, "status": "Available" }
                        }
                    },
                    "zone2": {
                        "name": "Zone B (Outside)",
                        "layoutImages": ["images/zone2_layout.jpg"],
                        "spots": {
                            "B1": { "name": "B1", "price": 25000, "status": "Available" },
                            "B2": { "name": "B2", "price": 25000, "status": "Available" },
                            "B3": { "name": "B3", "price": 25000, "status": "Available" },
                            "B4": { "name": "B4", "price": 25000, "status": "Available" }
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
            <div class="checkbox-group">
                <label class="checkbox-label"><input type="checkbox" name="businessType" value="Brand"> Brand</label>
                <label class="checkbox-label"><input type="checkbox" name="businessType" value="Distributor"> Distributor</label>
                <div class="checkbox-inline">
                    <label class="checkbox-label"><input type="checkbox" name="businessType" value="Other" id="check-other"> Other:</label>
                    <input type="text" id="other-text" class="inline-input" placeholder="Please specify">
                </div>
            </div>

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
        const otherTextInput = document.getElementById('other-text');
        const statusMessage = document.getElementById('status-message');

        const checkedBoxes = document.querySelectorAll('input[name="businessType"]:checked');
        if (checkedBoxes.length === 0) {
            statusMessage.className = 'status-message error';
            statusMessage.textContent = "Please select at least one Brand/Distributor type.";
            return;
        }

        let businessTypes = [];
        checkedBoxes.forEach(box => {
            if (box.value === 'Other') {
                businessTypes.push(`Other: ${otherTextInput.value}`);
            } else {
                businessTypes.push(box.value);
            }
        });

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
            businessType: businessTypes.join(', '),
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