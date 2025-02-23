// static/js/interaction.js
const profiles = [
    {
        image: 'static/images/myHeadshot.jpg',
        name: 'Jevin Wilson',
        title: 'Prompt Engineer/Data Trainer',
        company: 'Data Annotations Tech',
        description: 'Senior at SSU and 8 months of experience as a Prompt Engineer'
    },
    {
        image: 'static/images/SarahJohnson.jpg',
        name: 'Sarah Johnson, MBA',
        title: 'Marketing Director',
        company: 'Google',
        description: '10+ years of experience in digital marketing and brand strategy. Stanford Graduate.'
    },
    {
        image: 'static/images/MichaelChen.jpg',
        name: 'Michael Chen, PhD',
        title: 'Senior Data Scientist',
        company: 'Microsoft',
        description: 'AI researcher with focus on machine learning. MIT Alumni.'
    },
    {
        image: 'static/images/EmilyRodriguez.jpg',
        name: 'Emily Rodriguez',
        title: 'Product Manager',
        company: 'Apple',
        description: 'Leading product development for iOS applications. Harvard Business School.'
    },
    {
        image: 'static/images/DavidThompson.jpg',
        name: 'David Thompson',
        title: 'Investment Banker',
        company: 'Goldman Sachs',
        description: 'Specializing in mergers and acquisitions. Wharton Graduate.'
    }
];

let currentProfileIndex = 0;

window.addEventListener('load', function() {
    const card = document.querySelector('.card');
    loadNewProfile();
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
        currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
        const profile = profiles[currentProfileIndex];

        card.innerHTML = `
            <img src="${profile.image}" class="profile-image" alt="${profile.name}">
            <div class="profile-info">
                <div class="profile-name">${profile.name}</div>
                <div class="profile-title">${profile.title}</div>
                <div class="profile-company">${profile.company}</div>
                <div class="profile-description">
                    <p>${profile.description}</p>
                </div>
            </div>
        `;
        
        reset();
    }
});