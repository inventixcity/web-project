document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.href = '/admin';
    }
});

let typed = '';
document.addEventListener('keydown', function (e) {
    if (e.key && e.key.length === 1) {
        typed += e.key.toLowerCase();
        if (typed.length > 5) {
            typed = typed.slice(-5);
        }
        if (typed === 'admin') {
            typed = '';
            window.location.href = '/admin';
        }
    }
});
