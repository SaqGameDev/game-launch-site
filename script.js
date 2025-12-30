document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-feed');

    // Fetch the news data
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            // Clear loading text
            newsContainer.innerHTML = '';

            // Generate HTML for each news item
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'news-card glass-panel';
                card.innerHTML = `
                    <span class="news-date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                `;
                newsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = '<p>Intel offline. Check connection.</p>';
        });
});