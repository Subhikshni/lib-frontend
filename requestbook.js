document.addEventListener("DOMContentLoaded", function () {
  function fetchAndPopulatetitle() {
    fetch("http://localhost:3001/api/user/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch book titles");
        }
        return response.json();
      })
      .then((data) => {
        const bookDropdown = document.getElementById("title");
        bookDropdown.innerHTML = "";
        data.forEach((title) => {
          const option = document.createElement("option");
          option.text = title;
          option.value = title;
          bookDropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching books", error);
      });
  }

  fetchAndPopulatetitle();

  const bookingForm = document.getElementById("requestingbook");

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const Name = document.getElementById("Name").value;
    const libraryid = document.getElementById("libraryid").value;
    const from_date = document.getElementById("from_date").value;
    const to_date = document.getElementById("to_date").value;
    const Email = document.getElementById("Email").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const title = document.getElementById("title").value;

    const bookingData = {
      Name: Name,
      libraryid: libraryid,
      from_date: from_date,
      to_date: to_date,
      Email: Email,
      contactNumber: contactNumber,
      title: title,
    };

    fetch("http://localhost:3001/api/user/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Book Alloted");
          bookingForm.reset();
        } else {
          throw new Error("Failed Request");
        }
      })
      .catch((error) => {
        console.error("Error in requesting Book", error);
        alert("Failed to book. Please try again.");
      });
  });
});
