const scrollBar = document.getElementById('scrollBar');
let isResizing = false;
let isDragging = false;

ScrollBar.addEventListener('mousedown', (event) => {
 if (event.button === 0) { // Levim klikom
        isDragging = true;
        document.addEventListener('mousemove', dragScrollBar);
    } else if (event.button === 2) { // Desnim klikom
        isResizing = true;
        document.addEventListener('mousemove', resizeScrollBar);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    isResizing = false;
    document.removeEventListener('mousemove', dragScrollBar);
    document.removeEventListener('mousemove', resizeScrollBar);
});

function dragScrollBar(event) {
    if (isDragging) {
        const chatContainer = document.getElementById('chatContainer');
        const rect = chatContainer.getBoundingClientRect();
        const newTop = Math.min(rect.bottom - scrollBar.clientHeight, Math.max(rect.top, event.clientY - rect.top));
        scrollBar.style.top = `${newTop - rect.top}px`;
    }
}

function resizeScrollBar(event) {
    if (isResizing) {
        const newWidth = Math.max(5, Math.min(30, event.clientX - scrollBar.getBoundingClientRect().left));
        const newHeight = Math.max(10, Math.min(chatContainer.clientHeight, event.clientY - scrollBar.getBoundingClientRect().top));
        scrollBar.style.width = `${newWidth}px`;
        scrollBar.style.height = `${newHeight}px`;
    }
}

// On right-click, prevent the default context menu
scrollBar.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
