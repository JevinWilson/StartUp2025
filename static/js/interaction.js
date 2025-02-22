// static/js/interaction.js
window.addEventListener('load', function() {
    const card = document.querySelector('.card');
    const likeButton = document.querySelector('.like');
    const dislikeButton = document.querySelector('.dislike');
    let startX;
    let currentX;
    let isDragging = false;

    if (card) {
        card.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        if (likeButton) likeButton.addEventListener('click', like);
        if (dislikeButton) dislikeButton.addEventListener('click', dislike);
    }

    function startDragging(e) {
        isDragging = true;
        startX = e.clientX - card.offsetLeft;
    }

    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.clientX - startX;
        
        card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
        
        if (currentX > 150) {
            card.style.backgroundColor = '#e8f4ff';
        } else if (currentX < -150) {
            card.style.backgroundColor = '#ffe8f0';
        } else {
            card.style.backgroundColor = 'white';
        }
    }

    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
        
        if (currentX > 150) {
            like();
        } else if (currentX < -150) {
            dislike();
        } else {
            reset();
        }
    }

    function reset() {
        card.style.transform = 'translateX(0) rotate(0)';
        card.style.backgroundColor = 'white';
    }

    function like() {
        card.style.transform = 'translateX(1000px) rotate(30deg)';
        setTimeout(loadNewProfile, 300);
    }

    function dislike() {
        card.style.transform = 'translateX(-1000px) rotate(-30deg)';
        setTimeout(loadNewProfile, 300);
    }

    function loadNewProfile() {
        reset();
    }
});