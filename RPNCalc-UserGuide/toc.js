// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Chapters/Cover.html"><strong aria-hidden="true">1.</strong> Cover</a></li><li class="chapter-item expanded "><a href="Chapters/Introduction.html"><strong aria-hidden="true">2.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="Chapters/WhatIsRPN.html"><strong aria-hidden="true">3.</strong> What is an RPN Calculator</a></li><li class="chapter-item expanded "><a href="Chapters/Installation.html"><strong aria-hidden="true">4.</strong> Installation</a></li><li class="chapter-item expanded "><a href="Chapters/Stacks.html"><strong aria-hidden="true">5.</strong> Stacks</a></li><li class="chapter-item expanded "><a href="Chapters/HighLevelUsage.html"><strong aria-hidden="true">6.</strong> High Level Usage</a></li><li class="chapter-item expanded "><a href="Chapters/CommandLineOptions.html"><strong aria-hidden="true">7.</strong> Command Line Options</a></li><li class="chapter-item expanded "><a href="Chapters/Operands.html"><strong aria-hidden="true">8.</strong> Operands</a></li><li class="chapter-item expanded "><a href="Chapters/Configuration.html"><strong aria-hidden="true">9.</strong> Configuration</a></li><li class="chapter-item expanded "><a href="Chapters/CalculatorCommands.html"><strong aria-hidden="true">10.</strong> Calculator Commands</a></li><li class="chapter-item expanded "><a href="Chapters/Conversions.html"><strong aria-hidden="true">11.</strong> Conversions</a></li><li class="chapter-item expanded "><a href="Chapters/TrigFunctions.html"><strong aria-hidden="true">12.</strong> Trigonometry Functions</a></li><li class="chapter-item expanded "><a href="Chapters/MemoryCommands.html"><strong aria-hidden="true">13.</strong> Memory Commands</a></li><li class="chapter-item expanded "><a href="Chapters/Constants.html"><strong aria-hidden="true">14.</strong> Constants</a></li><li class="chapter-item expanded "><a href="Chapters/UserDefinedFunctions.html"><strong aria-hidden="true">15.</strong> User Defined Functions</a></li><li class="chapter-item expanded "><a href="Chapters/OperationalCommands.html"><strong aria-hidden="true">16.</strong> Operational Commands</a></li><li class="chapter-item expanded "><a href="Chapters/BuildingRPNCalc.html"><strong aria-hidden="true">17.</strong> Building RPNCalc</a></li><li class="chapter-item expanded "><a href="Chapters/Snap.html"><strong aria-hidden="true">18.</strong> Snap Usage</a></li><li class="chapter-item expanded "><a href="Chapters/Wrapup.html"><strong aria-hidden="true">19.</strong> Wrapup</a></li><li class="chapter-item expanded "><a href="Chapters/License.html"><strong aria-hidden="true">20.</strong> Licenses</a></li><li class="chapter-item expanded "><a href="Chapters/Acknowledgements.html"><strong aria-hidden="true">21.</strong> Acknowlegements</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
