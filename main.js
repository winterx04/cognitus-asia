document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector('.sidebar-menu');
    const images = document.querySelectorAll(".image-container img");
    const header = document.querySelector('header');

    menuIcon.addEventListener("mouseover", () => {
        sidebar.classList.add('active');
    });

    sidebar.addEventListener("mouseleave", () => {
        sidebar.classList.remove('active');
    });

    // Add a click event listener to the "Products" link to toggle the submenu
    const productsLink = document.querySelector(".products-link > a");
    const productsSubmenu = document.querySelector(".products-link .submenu");

    productsLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default behavior of the link
        productsSubmenu.classList.toggle("show-submenu");
    });

    // Additional code for image rotation
    let currentImageIndex = 0;

    // Function to fade in the next image and fade out the current one
    function showNextImage() {
        images[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add("active");
    }

    setInterval(showNextImage, 5000);

    // Add event listener for the window scroll event
    window.addEventListener('scroll', () => {
        // Add a shadow effect to the header when scrolling
        if (window.scrollY > 0) {
            header.classList.add('shadow');
        } else {
            header.classList.remove('shadow');
        }
    });
});

/* To let the carousel slide automatically */
document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
});

document.addEventListener('DOMContentLoaded', function () {
    showScammerAlert();
});

// Function to show the scammer alert message
function showScammerAlert() {
    var dimmedBackground = document.getElementById('dimmed-background');
    var messageBox = document.getElementById('message-box');

    // Set opacity to 1 (fully visible) and translateY to 0 (normal position)
    dimmedBackground.style.display = 'flex';
    setTimeout(function () {
        dimmedBackground.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';
    }, 100); // Delay for a smoother effect
}

// Function to hide the scammer alert message
function hideScammerAlert() {
    var dimmedBackground = document.getElementById('dimmed-background');
    var messageBox = document.getElementById('message-box');

    // Set opacity to 0 (invisible) and translateY to -50px (off-screen)
    dimmedBackground.style.opacity = '0';
    messageBox.style.transform = 'translateY(-50px)';

    // Hide the dimmed background after the animation is complete
    setTimeout(function () {
        dimmedBackground.style.display = 'none';
    }, 500); // Wait for the transition duration
}