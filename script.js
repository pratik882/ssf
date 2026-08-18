```javascript
// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;
    }

    formMessage.textContent =
        "Thank you! Your message has been received.";

    contactForm.reset();

});


// ================= NAVBAR SCROLL =================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(5,5,5,0.97)";

    } else {

        navbar.style.background = "rgba(8,8,8,0.85)";

    }

});


// ================= SIMPLE REVEAL ANIMATION =================

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .why-card, .stat"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});
```