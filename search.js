document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchB");
  const searchInput = document.getElementById("search");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      alert("Please enter a search term.");
      return;
    }

    // Elements to search through (e.g., all headings and paragraphs)
    const contentElements = document.querySelectorAll("h1, h2, h3, p");

    let found = false;

    // Reset any previous highlights
    contentElements.forEach(el => {
      el.style.backgroundColor = "";
    });

    // Loop through elements and find match
    contentElements.forEach(el => {
      if (el.textContent.toLowerCase().includes(searchTerm)) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.backgroundColor = "#707000"; // highlight
        found = true;
        return; // stop at the first match
      }
    });

    if (!found) {
      alert("No matching content found.");
    }
  });
});
