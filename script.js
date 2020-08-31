let myLibrary = JSON.parse(localStorage.getItem('library')) || [];

function Book (title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

Book.prototype.toggleStatus = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
};


let addBook = document.querySelector('#addBook');
let bookInput = document.querySelector('#bookInput');
let add = document.querySelector("#submit");
let clear = document.querySelector("#clear");

addBook.addEventListener('click', () => {
    bookInput.style.display = "block";
})


add.addEventListener('click', addNewBook);

clear.addEventListener('click', () => {
    bookInput.style.display = "none";
    document.querySelector("#bookForm").reset();
});

function addNewBook() {
	let title = document.querySelector('#title').value;
	let author = document.querySelector('#author').value;
	let pages = document.querySelector('#pages').value;
	let read = document.querySelector('#read').checked;

    if(title === "" || author === ""|| pages === "") {
        alert("pleas input all values");
    } else {
	let newBook = new Book(title,author,pages,read);

    myLibrary.push(newBook);

    bookInput.style.display = "none";
    
    document.querySelector("#bookForm").reset();
    
    render();
}
}

function render() {
    localStorage.setItem('library', JSON.stringify(myLibrary));

    const shelf = document.querySelector('#shelf');
    shelf.innerHTML = '';

    for (let i= 0; i < myLibrary.length; i++ ) {

        let bookContainer = document.createElement("DIV");
        bookContainer.classList.add('book');
        bookContainer.setAttribute('id',`${i}`);

        let bookTitle = document.createElement("P");
        bookTitle.classList.add('title');
        bookTitle.textContent = myLibrary[i].title;
        bookContainer.appendChild(bookTitle);

        let bookAuthor = document.createElement("P");
        bookAuthor.classList.add('author');
        bookAuthor.textContent = myLibrary[i].author;
        bookContainer.appendChild(bookAuthor);

        let bookPages = document.createElement("P");
        bookPages.classList.add('pages');
        bookPages.textContent = `${myLibrary[i].pages} pages`;
        bookContainer.appendChild(bookPages);
        
        let checkboxDiv = document.createElement("DIV");
        checkboxDiv.classList.add("checkboxDiv");
        bookContainer.appendChild(checkboxDiv);

        let bookCheckbox = document.createElement("input");
        bookCheckbox.setAttribute("type", "checkbox");
        bookCheckbox.classList.add('checkbox');
        bookCheckbox.setAttribute("data-boxId", `${i}`)
        checkboxDiv.appendChild(bookCheckbox);

        let checkboxLable = document.createElement("label");
        checkboxLable.setAttribute("for",`bookCheckbox${i}` )
					if (myLibrary[i].read) {
                            bookCheckbox.checked = true;
							checkboxLable.textContent = "Have read";
					} else {
							checkboxLable.textContent = "Need to read";
					}
        
        checkboxDiv.appendChild(checkboxLable);

       bookCheckbox.onclick = () => {
            if(bookCheckbox.checked) {
                checkboxLable.textContent = "Have read";
            } else {
                checkboxLable.textContent = "Need to read";   
            }
        }

        let deleteButton = document.createElement("BUTTON");
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete book';
        bookContainer.appendChild(deleteButton);

        shelf.appendChild(bookContainer);

    }

		let deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(btn => btn.addEventListener('click', () => {
            let num = btn.parentNode.getAttribute('id');
            removeBook(num);
         }));

         let checkboxes = document.querySelectorAll(".checkbox");
            checkboxes.forEach(box => box.addEventListener('click', () => {
            let num = box.getAttribute('data-boxId');
            myLibrary[num].read = !myLibrary[num].read;
            localStorage.setItem('library', JSON.stringify(myLibrary));
         }))

        
   
}


function removeBook(position) {
	myLibrary.splice(position, 1);
	render();
}

 
window.onload = () => {
    if(myLibrary.length === 0) {
        const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
        myLibrary.push(theHobbit);
    }

	render();
};

