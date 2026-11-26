/* Shared enhancements: theme toggle, scroll progress, count-up stats,
   staggered reveals and the portfolio filter. Loaded at the end of <body>. */
(function () {
    var root = document.documentElement;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Theme toggle ---------- */
    function syncToggles() {
        var dark = root.classList.contains('dark');
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
            btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
            btn.title = dark ? 'Light mode' : 'Dark mode';
        });
    }
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var dark = root.classList.toggle('dark');
            try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
            syncToggles();
        });
    });
    syncToggles();
    // Enable colour transitions only after the first paint, so page loads don't animate.
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('theme-ready'); }); });

    /* ---------- Scroll progress bar ---------- */
    var bar = document.querySelector('.scroll-progress');
    if (bar) {
        var ticking = false;
        var update = function () {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
            ticking = false;
        };
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        update();
    }

    /* ---------- Staggered reveal for grid children ---------- */
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
        Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
            if (reduceMotion) return;
            el.style.transitionDelay = (i % 6) * 85 + 'ms';
        });
    });

    /* Once an element has finished revealing, drop the reveal classes and delay
       so its own hover transitions (cards lifting etc.) are quick again. */
    if (!reduceMotion) {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.addEventListener('transitionend', function done(e) {
                if (e.target !== el || e.propertyName !== 'opacity' || !el.classList.contains('is-visible')) return;
                el.style.transitionDelay = '';
                el.classList.remove('reveal', 'is-visible');
                el.removeEventListener('transitionend', done);
            });
        });
    }

    /* ---------- Word-by-word heading reveal ---------- */
    if (!reduceMotion) {
        var splitTargets = document.querySelectorAll('[data-split-words], h2.t-h2');
        var splitIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('is-split-in'); splitIO.unobserve(entry.target); }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }) : null;

        splitTargets.forEach(function (el) {
            if (el.children.length) return; // only plain-text headings
            var text = el.textContent.trim();
            if (!text) return;
            var base = parseInt(el.getAttribute('data-split-delay') || '0', 10);
            el.setAttribute('aria-label', text);
            el.textContent = '';
            text.split(/\s+/).forEach(function (word, i) {
                var outer = document.createElement('span');
                outer.className = 'split-word';
                outer.setAttribute('aria-hidden', 'true');
                var inner = document.createElement('span');
                inner.textContent = word;
                inner.style.transitionDelay = (base + i * 60) + 'ms';
                outer.appendChild(inner);
                el.appendChild(outer);
                el.appendChild(document.createTextNode(' '));
            });
            if (el.hasAttribute('data-split-words') || !splitIO) {
                // Page-banner and hero headings play as part of the load sequence
                requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-split-in'); }); });
            } else {
                splitIO.observe(el);
            }
        });
    }

    /* ---------- Count-up numbers ---------- */
    var counters = document.querySelectorAll('[data-count]');
    function runCounter(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
        var start = null, duration = 1400;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    if (counters.length) {
        if ('IntersectionObserver' in window) {
            var co = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) { runCounter(entry.target); co.unobserve(entry.target); }
                });
            }, { threshold: 0.6 });
            counters.forEach(function (el) { co.observe(el); });
        } else {
            counters.forEach(runCounter);
        }
    }

    /* ---------- Portfolio filter ---------- */
    var filterBar = document.querySelector('[data-filter-bar]');
    if (filterBar) {
        var buttons = filterBar.querySelectorAll('.filter-btn');
        var projects = document.querySelectorAll('.project');
        var status = document.getElementById('filter-status');

        // Fill in the count badge on each button
        buttons.forEach(function (btn) {
            var f = btn.getAttribute('data-filter');
            var n = f === 'all' ? projects.length : Array.prototype.filter.call(projects, function (p) {
                return (' ' + p.getAttribute('data-category') + ' ').indexOf(' ' + f + ' ') !== -1;
            }).length;
            var c = btn.querySelector('.count');
            if (c) c.textContent = n;
        });

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var f = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
                var shown = 0;
                projects.forEach(function (p) {
                    p.style.transitionDelay = '';
                    var match = f === 'all' || (' ' + p.getAttribute('data-category') + ' ').indexOf(' ' + f + ' ') !== -1;
                    if (match) {
                        shown++;
                        p.classList.remove('is-hidden');
                        p.classList.add('is-visible');
                        requestAnimationFrame(function () { p.classList.remove('is-hiding'); });
                    } else if (!p.classList.contains('is-hidden')) {
                        p.classList.add('is-hiding');
                        setTimeout(function () { if (p.classList.contains('is-hiding')) p.classList.add('is-hidden'); }, reduceMotion ? 0 : 200);
                    }
                });
                if (status) status.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's');
            });
        });
    }
})();
