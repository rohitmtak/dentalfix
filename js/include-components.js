// components/includeComponents.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML components
    async function includeHTML(elementId, componentPath) {
      try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
      } catch (error) {
        console.error('Error loading component:', error);
      }
    }
  
    // Include navbar and footer
    includeHTML('navbar-placeholder', '../components/navbar.html');
    includeHTML('footer-placeholder', '../components/footer.html');
  });