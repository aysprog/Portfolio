
(() => {
    "use strict";

    // =========================================
    // 1. GENERAL SETTINGS
    // =========================================

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =========================================
    // 2. HERO ROTATING TEXT
    // =========================================

    const phrases = [
        "digital experiences.",
        "thoughtful interfaces.",
        "responsive websites.",
        "meaningful interactions."
    ];

    const role = document.getElementById("rotatingRole");

    if (role && !reduceMotion) {
        let index = 0;

        window.setInterval(() => {
            role.classList.add("changing");

            window.setTimeout(() => {
                index = (index + 1) % phrases.length;
                role.textContent = phrases[index];
                role.classList.remove("changing");
            }, 300);

        }, 2800);
    }


    // =========================================
    // 3. RESPONSIVE NAVIGATION
    // =========================================

    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");

    if (toggle && nav) {
        const closeMenu = (focusToggle = false) => {
            nav.classList.remove("open");

            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");

            if (focusToggle) {
                toggle.focus();
            }
        };

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));

            toggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            if (
                isOpen &&
                window.matchMedia("(max-width: 760px)").matches
            ) {
                nav.querySelector("a")?.focus();
            }
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => closeMenu());
        });

        document.addEventListener("keydown", event => {
            if (
                event.key === "Escape" &&
                nav.classList.contains("open")
            ) {
                closeMenu(true);
            }
        });

        document.addEventListener("click", event => {
            if (
                nav.classList.contains("open") &&
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    // =========================================
    // 4. PROJECT DATA
    // Add new projects to this array
    // =========================================

    const portfolioProjects = [
        {
            number: "01",
            title: "Brewora",
            category: "website",
            categoryLabel: "Coffee Website",

            description:
                "A specialty coffee experience with warm visuals, refined layouts and responsive design.",

            technologies: [
                "HTML",
                "Tailwind CSS",
                "JavaScript"
            ],

            image: "images/coffee.png",
            previewBackground: "#E9DCE2",
            previewTitle: "brewora",
            previewSubtitle: "SPECIALTY COFFEE",

            liveUrl: "https://aysprog.github.io/coffee/",
            codeUrl: "https://github.com/aysprog/coffee.git"
        },

        {
            number: "02",
            title: "StudentHub",
            category: "javascript",
            categoryLabel: "Student Management",

            description:
                "A student-focused application designed to make information and everyday tasks easier to manage.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            image: "assets/studenthub.jpg",
            previewBackground: "#E3EADF",
            previewTitle: "StudentHub",
            previewSubtitle: "YOUR STUDENT SPACE",

            liveUrl: "#",
            codeUrl: "#"
        },

        {
            number: "03",
            title: "Online Product Store",
            category: "website",
            categoryLabel: "E-commerce",

            description:
                "A clean shopping interface with product-focused layouts and a user-friendly browsing experience.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            image: "assets/online-store.jpg",
            previewBackground: "#F0E5DB",
            previewTitle: "the edit",
            previewSubtitle: "THOUGHTFULLY SELECTED",

            liveUrl: "#",
            codeUrl: "#"
        },

        {
            number: "04",
            title: "Daylist",
            category: "javascript",
            categoryLabel: "Productivity App",

            description:
                "A daily planning concept built to organize tasks and keep everyday routines on track.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            image: "assets/daylist.jpg",
            previewBackground: "#E5E8DD",
            previewTitle: "daylist",
            previewSubtitle: "MAKE ROOM FOR WHAT MATTERS",

            liveUrl: "#",
            codeUrl: "#"
        }
    ];


    // =========================================
    // 5. PROJECT ELEMENTS
    // =========================================

    const projectsGrid = document.getElementById("projectsGrid");
    const projectsCount = document.getElementById("projectsCount");

    const filterButtons = document.querySelectorAll(
        ".project-filters .filter-btn"
    );

    const filterStatus = document.getElementById("filterStatus");


    // =========================================
    // 6. CREATE PROJECT CARD
    // =========================================

    function createProjectCard(project) {
        const card = document.createElement("article");

        card.className = "project-card";
        card.dataset.category = project.category;

        // Project visual background
        const visual = document.createElement("div");

        visual.className = "project-visual";

        visual.style.setProperty(
            "--visual-bg",
            project.previewBackground || "#E9DCE2"
        );

        // Project number
        const number = document.createElement("span");

        number.className = "project-number";
        number.textContent = project.number;

        // Category label
        const kind = document.createElement("span");

        kind.className = "project-kind";
        kind.textContent = project.categoryLabel;

        // Browser frame
        const browser = document.createElement("div");

        browser.className = "browser-window";

        // Browser toolbar
        const toolbar = document.createElement("div");

        toolbar.className = "browser-topbar";

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("span");

            dot.className = "browser-dot";
            toolbar.appendChild(dot);
        }

        const address = document.createElement("span");

        address.className = "browser-address";
        address.textContent = project.title.toLowerCase();

        toolbar.appendChild(address);

        // Browser content
        const browserContent = document.createElement("div");

        browserContent.className = "browser-content";

        // Fallback preview, shown when image is missing
        const fallback = document.createElement("div");

        fallback.className = "preview-fallback";

        fallback.style.background =
            project.previewBackground || "#E9DCE2";

        const fallbackTitle = document.createElement("strong");

        fallbackTitle.textContent =
            project.previewTitle || project.title;

        const fallbackSubtitle = document.createElement("span");

        fallbackSubtitle.textContent =
            project.previewSubtitle || "SELECTED PROJECT";

        fallback.append(fallbackTitle, fallbackSubtitle);

        browserContent.appendChild(fallback);

        // Add project screenshot once
        if (project.image) {
            const image = document.createElement("img");

            image.src = project.image;
            image.alt = `${project.title} project preview`;
            image.loading = "lazy";

            image.addEventListener("load", () => {
                fallback.remove();
            }, { once: true });

            image.addEventListener("error", () => {
                image.remove();
            }, { once: true });

            browserContent.appendChild(image);
        }

        browser.append(toolbar, browserContent);

        visual.append(number, kind, browser);


        // =====================================
        // Project information
        // =====================================

        const details = document.createElement("div");

        details.className = "project-details";

        const meta = document.createElement("div");

        meta.className = "project-meta";

        const category = document.createElement("span");

        category.className = "project-category";
        category.textContent = project.categoryLabel;

        const index = document.createElement("span");

        index.className = "project-index";
        index.textContent = `PROJECT ${project.number}`;

        meta.append(category, index);

        const title = document.createElement("h3");

        title.className = "project-title";
        title.textContent = project.title;

        const description = document.createElement("p");

        description.className = "project-description";
        description.textContent = project.description;

        // Technology tags
        const tags = document.createElement("div");

        tags.className = "project-tags";

        (project.technologies || []).forEach(technology => {
            const tag = document.createElement("span");

            tag.className = "project-tag";
            tag.textContent = technology;

            tags.appendChild(tag);
        });


        // =====================================
        // Project action links
        // =====================================

        const actions = document.createElement("div");

        actions.className = "project-actions";

        function createLink(label, url, secondary = false) {
            const link = document.createElement("a");

            link.className = secondary
                ? "project-link secondary"
                : "project-link";

            link.textContent = label;

            const isPlaceholder = !url || url.trim() === "#";

            if (isPlaceholder) {
                link.href = "#";

                link.addEventListener("click", event => {
                    event.preventDefault();

                    alert(
                        `Please add the actual ${label} URL for ${project.title}.`
                    );
                });
            } else {
                link.href = url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }

            return link;
        }

        actions.append(
            createLink("Live Preview ↗", project.liveUrl),
            createLink("View Code ↗", project.codeUrl, true)
        );

        details.append(
            meta,
            title,
            description,
            tags,
            actions
        );

        card.append(visual, details);

        return card;
    }


    // =========================================
    // 7. RENDER PROJECTS
    // =========================================

    function renderProjects(filter = "all") {
        if (!projectsGrid) {
            return;
        }

        projectsGrid.replaceChildren();

        const filteredProjects = portfolioProjects.filter(project => {
            return filter === "all" || project.category === filter;
        });

        const fragment = document.createDocumentFragment();

        filteredProjects.forEach(project => {
            fragment.appendChild(createProjectCard(project));
        });

        projectsGrid.appendChild(fragment);

        // Update project counter
        if (projectsCount) {
            projectsCount.textContent =
                `${String(filteredProjects.length).padStart(2, "0")} PROJECTS`;
        }

        // Update optional screen-reader status
        if (filterStatus) {
            filterStatus.textContent =
                `${filteredProjects.length} ${
                    filteredProjects.length === 1 ? "project" : "projects"
                } shown`;
        }
    }


    // =========================================
    // 8. PROJECT FILTERS
    // Only one filter handler
    // =========================================

    filterButtons.forEach(button => {
        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );

        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";

            filterButtons.forEach(item => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);

                item.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            renderProjects(filter);
        });
    });

    // Initial render
    renderProjects();


    // =========================================
    // 9. REVEAL ANIMATIONS
    // =========================================

    const reveals = document.querySelectorAll(".reveal");

    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
    ) {
        reveals.forEach(element => {
            element.classList.add("visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        reveals.forEach(element => {
            revealObserver.observe(element);
        });
    }


    // =========================================
    // 10. ACTIVE NAVIGATION LINK
    // =========================================

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
    ) {
        const navObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    navLinks.forEach(link => {
                        const isCurrent =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isCurrent);

                        if (isCurrent) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }


    // =========================================
    // 11. AUTOMATIC FOOTER YEAR
    // =========================================

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

})();
