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
            el.style.transitionDelay = (i % 6) * 80 + 'ms';
            // Drop the delay once the element has appeared, so hover effects stay instant.
            el.addEventListener('transitionend', function clear() {
                el.style.transitionDelay = '';
                el.removeEventListener('transitionend', clear);
            });
        });
    });

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
