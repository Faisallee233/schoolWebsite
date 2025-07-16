document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".addbtn");
  const delBtn = document.querySelector(".delbtn");
  const newsContainer = document.querySelector(".news");
  const tagBlogs = document.querySelector(".tagblogs");

  const textInput = document.getElementById("text");
  const authorInput = document.getElementById("auther");
  const dateInput = document.getElementById("date");
  const descInput = document.getElementById("description");

  // Load blogs from localStorage
  function loadBlogs() {
    newsContainer.innerHTML = "";
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    tagBlogs.textContent = `Total blogs: ${blogs.length}`;

    blogs.forEach((blog, index) => {
      const blogDiv = document.createElement("div");
      blogDiv.className = "blog-entry";

      blogDiv.innerHTML = `
        <h3>${blog.title}</h3>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>Date:</strong> ${blog.date}</p>
        <p>${blog.description}</p>
        <button class="delete-single" data-index="${index}">Delete</button>
      `;

      newsContainer.appendChild(blogDiv);
    });

    // Add delete handler for individual delete buttons
    const deleteButtons = document.querySelectorAll(".delete-single");
    deleteButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteBlog(index);
      });
    });
  }

  // Add blog
  addBtn.addEventListener("click", () => {
    const title = textInput.value.trim();
    const author = authorInput.value.trim();
    const date = dateInput.value;
    const description = descInput.value.trim();

    if (!title || !author || !date || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newBlog = { title, author, date, description };

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    // Clear form
    textInput.value = "";
    authorInput.value = "";
    dateInput.value = "";
    descInput.value = "";

    loadBlogs();
  });

  // Delete all blogs
  delBtn.addEventListener("click", () => {
    const confirmDel = confirm("Are you sure you want to delete all blogs?");
    if (confirmDel) {
      localStorage.removeItem("blogs");
      loadBlogs();
    }
  });

  // Delete individual blog
  function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
  }

  loadBlogs(); // Load on page load
});
