let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let addBook = document.querySelector("#addBook");
let bookInput = document.querySelector("#bookInput");
let add = document.querySelector("#submit");
let clear = document.querySelector("#clear");

addBook.addEventListener("click", () => {
  bookInput.style.display = "block";
});

add.addEventListener("click", addNewBook);

clear.addEventListener("click", () => {
  bookInput.style.display = "none";
  document.querySelector("#bookForm").reset();
});

function addNewBook() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  if (title === "") {
    alert("Please input a Title");
  } else {
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    bookInput.style.display = "none";

    document.querySelector("#bookForm").reset();

    render();
  }
}

function render() {
  localStorage.setItem("library", JSON.stringify(myLibrary));

  const shelf = document.querySelector("#shelf");
  shelf.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let rowDiv = document.createElement("DIV");
    rowDiv.classList.add("row", "book");

    let colDiv = document.createElement("DIV");
    colDiv.classList.add("col", "s12", "m6", "l4");

    let cardDiv = document.createElement("DIV");
    cardDiv.classList.add("card", "blue-grey", "darken-1");
    colDiv.appendChild(cardDiv);

    let bookContainer = document.createElement("DIV");
    bookContainer.classList.add("card-content", "white-text");
    cardDiv.appendChild(bookContainer);

    let bookTitle = document.createElement("H4");
    bookTitle.classList.add("title");
    bookTitle.textContent = myLibrary[i].title;
    bookContainer.appendChild(bookTitle);

    let bookAuthor = document.createElement("H6");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = myLibrary[i].author;
    bookContainer.appendChild(bookAuthor);

    let bookPages = document.createElement("P");
    bookPages.classList.add("pages");
    if (myLibrary[i].pages === "") {
      bookPages.textContent = "";
    } else {
      bookPages.textContent = `${myLibrary[i].pages} pages`;
    }

    bookContainer.appendChild(bookPages);

    let checkboxDiv = document.createElement("DIV");
    checkboxDiv.classList.add("switch", "switch-box");
    checkboxDiv.setAttribute("switch-id", `${i}`);
    if (myLibrary[i].read) {
      checkboxDiv.innerHTML = `<label>Not Done
        <input type="checkbox" class="checkbox" checked="checked">
        <span class="lever"></span>
        Done
        </label>`;
    } else {
      checkboxDiv.innerHTML = `<label>Not Done
        <input type="checkbox" class="checkbox">
        <span class="lever"></span>
        Done
        </label>`;
    }
    bookContainer.appendChild(checkboxDiv);

    let cardActionDiv = document.createElement("DIV");
    cardActionDiv.classList.add("card-action", "row", "no-margin-bottom");
    bookContainer.appendChild(cardActionDiv);

    let deleteButton = document.createElement("BUTTON");
    deleteButton.setAttribute("id", `${i}`);
    deleteButton.classList.add(
      "delete",
      "waves-effect",
      "waves-light",
      "btn-flat",
      "right",
      "teal-text",
      "text-lighten-3"
    );
    deleteButton.textContent = "Delete book";
    cardActionDiv.appendChild(deleteButton);

    shelf.appendChild(colDiv);
  }

  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      let num = btn.getAttribute("id");
      removeBook(num);
    })
  );

  let checkboxes = document.querySelectorAll(".switch-box");
  checkboxes.forEach((box) =>
    box.addEventListener("change", () => {
      let num = box.getAttribute("switch-id");
      myLibrary[num].read = !myLibrary[num].read;
      localStorage.setItem("library", JSON.stringify(myLibrary));
    })
  );
}

function removeBook(position) {
  myLibrary.splice(position, 1);
  render();
}

window.onload = () => {
  if (myLibrary.length === 0) {
    const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
    myLibrary.push(theHobbit);
  }

  render();
};
