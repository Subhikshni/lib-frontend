document.addEventListener("DOMContentLoaded", function () {
  const booksPerPage = 5; // Number of books to display per page
  let currentPage = 1; // Current page number

  function fetchAndPopulatebookdata(page) {
    const startIndex = (page - 1) * booksPerPage;
    fetch(
      `https://ab96-54-252-216-136.ngrok-free.app/api/admin/centers?page=${page}&limit=${booksPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch book data. Please try again later.");
        }
        return response.json();
      })
      .then((data) => {
        const tableBody = document.querySelector("#bookdata");
        tableBody.innerHTML = "";
        data.forEach((book) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.subject}</td>
              <td>${book.publish_date}</td>
              <td>${book.num_available}</td>
              <td><button class="deleteBtn" data-id="${book.id}">Delete</button></td> <!-- Add delete button with book ID -->
            `;
          tableBody.appendChild(row);
        });
        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const bookId = button.getAttribute("data-id");
            const confirmation = confirm(
              "Are you sure you want to delete this book?"
            );
            if (confirmation) {
              deleteBook(bookId);
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching book data:", error.message);
        alert(error.message);
      });
  }

  function deleteBook(bookId) {
    fetch(
      `https://ab96-54-252-216-136.ngrok-free.app/api/admin/centers/${bookId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete book");
        }
        fetchAndPopulatebookdata(currentPage);
      })
      .catch((error) => {
        console.error("Error deleting book:", error.message);
        alert(error.message);
      });
  }

  function renderPaginationButtons(totalPages) {
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => {
        currentPage = i;
        fetchAndPopulatebookdata(currentPage);
      });
      paginationContainer.appendChild(button);
    }
  }

  fetch("https://ab96-54-252-216-136.ngrok-free.app/api/admin/centers")
    .then((response) => response.json())
    .then((data) => {
      const totalPages = Math.ceil(data.length / booksPerPage);
      renderPaginationButtons(totalPages);
      fetchAndPopulatebookdata(currentPage);
    })
    .catch((error) => {
      console.error("Error fetching book data:", error.message);
      alert(error.message);
    });

  const addCenterForm = document.getElementById("addCenterForm");

  addCenterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const subject = document.getElementById("subject").value;
    const publish_date = document.getElementById("publish_date").value;
    const num_available = document.getElementById("num_available").value;
    const bookData = {
      title: title,
      author: author,
      subject: subject,
      publish_date: publish_date,
      num_available: num_available,
    };
    fetch("https://ab96-54-252-216-136.ngrok-free.app/api/admin/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (response.ok) {
          alert("New book added successfully!");
          addCenterForm.reset();
          fetchAndPopulatebookdata(currentPage);
        } else {
          throw new Error("Failed to add new book");
        }
      })
      .catch((error) => {
        console.error("Error adding new book:", error.message);
        alert(error.message);
      });
  });
});
