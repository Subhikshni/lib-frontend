document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBySelect = document.getElementById("searchBySelect");
  const sortBySelect = document.getElementById("sortBySelect");
  const bookList = document.getElementById("bookList");
  let data = [];

  function fetchAndPopulateBookData() {
    fetch("https://ab96-54-252-216-136.ngrok-free.app/api/user/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        return response.json();
      })
      .then((responseData) => {
        data = responseData;
        renderBookList(data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        alert("Failed to fetch book data. Please try again.");
      });
  }

  function renderBookList(books) {
    bookList.innerHTML = "";
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.subject}</td>
                <td>${book.publish_date}</td>
                <td>${book.num_available}</td>
            `;
      bookList.appendChild(row);
    });
  }

  fetchAndPopulateBookData();

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const searchBy = searchBySelect.value;
    const filteredBooks = data.filter((book) =>
      book[searchBy].toLowerCase().includes(searchTerm)
    );
    renderBookList(filteredBooks);
  });

  sortBySelect.addEventListener("change", function () {
    const sortBy = sortBySelect.value;
    const sortedBooks = data.slice().sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    renderBookList(sortedBooks);
  });

  const requestBookButton = document.getElementById("requestBookButton");
  requestBookButton.addEventListener("click", function () {
    // Redirect to requestbook.html
    window.location.href = "requestbook.html";
  });
});
