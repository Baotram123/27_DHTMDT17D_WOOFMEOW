const revealButton = document.querySelector('.reveal-button');
const longDescription = document.querySelector('.long-description');

revealButton.addEventListener('click', toggleDescription);

function toggleDescription() {
    if (longDescription.style.display === 'none') {
        longDescription.style.display = 'block';
        revealButton.textContent = 'ẨN MÔ TẢ SẢN PHẨM'; // Change button text to "Hide Description"
    } else {
        longDescription.style.display = 'none';
        revealButton.textContent = 'MÔ TẢ SẢN PHẨM'; // Change button text back to "Read More"
    }
}
