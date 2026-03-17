// Smooth scroll function for CTA button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animated counter for statistics with easing
function countUp(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();

    function update() {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;

        if (progress < 1) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat')) {
                const h3 = entry.target.querySelector('h3');
                const value = parseInt(h3.textContent, 10);
                countUp(h3, value);
                observer.unobserve(entry.target);
            }

            if (!entry.target.classList.contains('animated')) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animated {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.stat').forEach(stat => {
    observer.observe(stat);
});

document.querySelectorAll('.room-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.08}s`;
    observer.observe(card);
});

document.querySelectorAll('.amenity-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.08}s`;
    observer.observe(card);
});

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.08}s`;
    observer.observe(item);
});

// Active nav link highlighting with smooth color transition
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '#ecf0f1';
        link.style.transition = 'color 0.3s ease';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = '#ffffff';
            link.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
        } else {
            link.style.textShadow = 'none';
        }
    });
});

document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-8px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

document.querySelectorAll('.amenity-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact button functionality with ripple effect
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});

// Mobile menu toggle (optional - for future expansion)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Chatbot AI for Hotel Centrum and Prizren
const chatbotKnowledge = [
    {
        keywords: ['hotel', 'hotel centrum', 'stay', 'accommodation', 'room', 'suite', 'booking'],
        response: "Hotel Centrum is designed as a premium city stay in Prizren, with elegant rooms, concierge-style service, dining access, and walkable access to the historic center. When choosing a hotel here, guests usually care most about location, comfort, and easy access to the old town."
    },
    {
        keywords: ['restaurant', 'restaurants', 'food', 'eat', 'dinner', 'lunch', 'breakfast'],
        response: "Prizren has a strong restaurant scene around the old town, riverside, and Shadervan area. Visitors usually look for traditional grills, relaxed family restaurants, dessert cafes, and scenic evening dining close to the historic center."
    },
    {
        keywords: ['local food', 'traditional food', 'specialties', 'what to eat', 'dish', 'dishes'],
        response: "In Prizren, travelers often look for grilled dishes, fresh bread, pastries, local cheese, peppers, hearty comfort food, and strong cafe culture. A good local food day usually means breakfast in town, a traditional lunch, and coffee or dessert near the bazaar."
    },
    {
        keywords: ['history', 'historic', 'past', 'prizren history'],
        response: "Prizren has a layered history shaped by Roman, Byzantine, medieval Serbian, and Ottoman influence. That long history is why the city feels architecturally rich, with fortifications, bridges, mosques, churches, merchant streets, and traditional houses close together."
    },
    {
        keywords: ['castle', 'fortress'],
        response: "Prizren Fortress is one of the city's most famous landmarks. Many visitors go for the panoramic view over the river, old roofs, mosque domes, and surrounding mountains, especially later in the afternoon."
    },
    {
        keywords: ['league of prizren', 'league'],
        response: "The League of Prizren, founded in 1878, is one of the city's most important political and cultural milestones. It is a key part of the historical identity of Prizren and often comes up in conversations about Albanian national history."
    },
    {
        keywords: ['old town', 'old bazaar', 'bazaar', 'shadervan', 'center'],
        response: "The old town is the social heart of Prizren. Shadervan and the old bazaar are ideal for walking, coffee stops, local shopping, and getting a feel for the city's everyday atmosphere."
    },
    {
        keywords: ['mosque', 'sinan pasha'],
        response: "Sinan Pasha Mosque is one of Prizren's most recognizable Ottoman-era landmarks. It is part of the classic walking route through the city center and adds a lot to the skyline and historic character of the city."
    },
    {
        keywords: ['church', 'ljevis', 'virgin mary', 'cathedral', 'unesco'],
        response: "The Church of Our Lady of Ljevis is one of Prizren's most important medieval religious monuments and is tied to UNESCO heritage recognition. It reflects the artistic and spiritual depth of the city's past."
    },
    {
        keywords: ['mountains', 'sharr', 'nature', 'hiking'],
        response: "Prizren is framed by the Sharr Mountains, which makes it a good mix of culture and scenery. Many visitors enjoy the contrast between the compact historic center and the nearby mountain landscape."
    },
    {
        keywords: ['coffee', 'cafe', 'cafes'],
        response: "Cafe culture is a big part of Prizren. Many guests like to pause near the river or central squares for coffee, dessert, and people-watching, especially in the late afternoon and evening."
    },
    {
        keywords: ['one day', '1 day', 'itinerary', 'what should i do', 'what to do'],
        response: "A simple day in Prizren usually starts in the old town, continues through Shadervan and the bazaar, includes key historical landmarks, then finishes with a fortress view, dinner, and an evening walk back through the center."
    },
    {
        keywords: ['family', 'kids', 'children'],
        response: "Prizren works well for families because the center is very walkable. A relaxed family plan usually means short sightseeing stops, open public spaces, easy food options, and a hotel close enough for breaks during the day."
    },
    {
        keywords: ['night', 'nightlife', 'evening'],
        response: "Prizren evenings are usually more atmospheric than loud. Most visitors enjoy dinner, cafe hopping, riverside walks, and the look of the illuminated historic center after sunset."
    }
];

const chatbotQuickReplies = {
    greeting: "Hello! I can help with Hotel Centrum, Prizren history, restaurants, local food, landmarks, and travel tips. Ask me about where to stay, what to eat, or what to visit in Prizren.",
    thanks: "You're welcome. If you want, I can also suggest a simple Prizren itinerary, dining ideas, or hotel stay tips.",
    help: "Try asking things like: what to visit in Prizren, what food to try, where to stay, what makes Hotel Centrum special, or which historical landmarks are most important.",
    fallback: "I can help most with Hotel Centrum, Prizren history, restaurants, local food, landmarks, and walking ideas. Try asking about the old bazaar, fortress, local dishes, or hotel stays."
};

function findKnowledgeResponse(input) {
    for (const item of chatbotKnowledge) {
        if (item.keywords.some(keyword => input.includes(keyword))) {
            return item.response;
        }
    }

    return null;
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active')) {
        document.getElementById('chatbot-input').focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message === '') return;

    addMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const p = document.createElement('p');
    p.textContent = text;

    messageDiv.appendChild(p);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateResponse(userInput) {
    const input = userInput.toLowerCase();

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return chatbotQuickReplies.greeting;
    }

    if (input.includes('thank') || input.includes('thanks')) {
        return chatbotQuickReplies.thanks;
    }

    if (input.includes('help') || input.includes('what can')) {
        return chatbotQuickReplies.help;
    }

    if (input.includes('best hotel') || input.includes('where to stay')) {
        return "Most visitors prefer staying close to Prizren's historic center so they can walk to landmarks, restaurants, and cafes. Hotel Centrum is built around that kind of convenient premium city stay.";
    }

    if (input.includes('best restaurant') || input.includes('recommend restaurant')) {
        return "A strong restaurant choice in Prizren depends on whether you want traditional food, a relaxed riverside meal, or a central cafe atmosphere. The old town is usually the best area to start.";
    }

    const knowledgeResponse = findKnowledgeResponse(input);
    if (knowledgeResponse) {
        return knowledgeResponse;
    }

    return chatbotQuickReplies.fallback;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hotel website loaded successfully!');

    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease-in';
    }

    document.querySelectorAll('.contact-item').forEach(item => {
        observer.observe(item);
    });

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            formSuccess.hidden = false;
            contactForm.reset();
        });
    }

    console.log('Chatbot initialized and ready to assist with Hotel Centrum and Prizren travel questions.');
});
