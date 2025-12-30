document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-feed');

    // Fetch the news data
    fetch('news.json')
        .then(response => {
            if (!response.ok) throw new Error('Intel database unreachable');
            return response.json();
        })
        .then(data => {
            // 1. Sort Data: Newest dates first (Desc)
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Clear "Fetching Intel..." text
            newsContainer.innerHTML = '';

            // 2. Generate Cards
            sortedData.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'news-card glass-panel';

                // Add staggered animation delay (0s, 0.1s, 0.2s...)
                // Note: We need a tiny CSS rule for 'fadeIn' to make this work smoothly
                card.style.opacity = '0';
                card.style.animation = `fadeIn 0.5s ease-out forwards ${index * 0.15}s`;

                // 3. Format Date to "Tactical Style" (e.g. "DEC 30 // 2025")
                const dateObj = new Date(item.date);
                const options = { month: 'short', day: '2-digit', year: 'numeric' };
                const rawDate = dateObj.toLocaleDateString('en-US', options).toUpperCase();
                // Custom visual separator
                const tacticalDate = rawDate.replace(',', ' //');

                card.innerHTML = `
                    <span class="news-date">
                        <i class="fa-solid fa-square-rss"></i> ${tacticalDate}
                    </span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                `;
                newsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading news:', error);
            // Red Error Box
            newsContainer.innerHTML = `
                <div class="glass-panel" style="padding: 20px; text-align: center; border-color: #ff3333; color: #ff3333;">
                    <i class="fa-solid fa-triangle-exclamation"></i> 
                    <strong>CONNECTION LOST:</strong> UNABLE TO RETRIEVE INTEL.
                </div>
            `;
        });
});