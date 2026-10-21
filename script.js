
document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.textContent = isOpen ? "×" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");

            });

        });
    }

    // 2. Scroll Animation
    const elements = document.querySelectorAll(
        ".hero-text, .section-title, .card, " +
        ".education-card, .about-wrapper, .contact-box, .contact-form"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elements.forEach(function (element) {

            element.classList.add("reveal");
            observer.observe(element);

        });

    }

    // 3. Active Navbar Link
    const sections = document.querySelectorAll("main section[id]");

    const navItems = document.querySelectorAll(
        "#navLinks a[href^='#']"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navItems.forEach(function (link) {
                            link.classList.remove("active");
                        });

                        const activeLink = document.querySelector(
                            '#navLinks a[href="#' +
                            entry.target.id + '"]'
                        );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    }

                });

            },
            {
                rootMargin: "-25% 0px -65% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }

    // 4. Automatic Footer Year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
