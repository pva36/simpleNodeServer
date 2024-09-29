const deleteButtons = document.querySelectorAll("form.delete-form");

deleteButtons.forEach((button) => {
  button.addEventListener("submit", (event) => {
    if (!confirm("Are you sure you want to delete this movie?")) {
      event.preventDefault();
      console.log("form's default prevented");
    }
  });
});
