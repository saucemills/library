let myLibrary = [];
let idNumber = 0;

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.status = status;
        this.pages = pages;
        this.idNumber = idNumber;
        idNumber++;
    }
}

const submitButton = document.getElementById('submit');
const form = document.getElementById('form');
const content = document.getElementById('content');

const getRadioVal = function() {
    let val = null;

    let radioGroup = form.elements['status'];

    for(i = 0; i < radioGroup.length; i++) {
        if(radioGroup[i].checked) {
            val = radioGroup[i].value;
            break;
        }
    }
    return val;
}

submitButton.addEventListener('click', function() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let status = getRadioVal();

    if (title !== '' && author !== '' && pages > 0 && status !== null) {
        addToLibrary(title, author, pages, status);
        form.reset();
    } else {
        alert('Please make sure all fields are entered correectly.');
    }
});

const addToLibrary = function(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);

    createBookCard(newBook);
}

const deleteFromLibrary = function(book) {
    let bookId = book.idNumber;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].idNumber == bookId) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

const createBookCard = function (book) {
    let bookCard = document.createElement('div');
    document.getElementById('content').appendChild(bookCard);
    bookCard.id = `idNum${book.idNumber}`;

    bookCard.innerHTML = `
    <div class="book-card">
        <div class="book-card-title">
            <h3>${book.title}</h3>
        </div>
        <div class"book-card-content">
            <p>by ${book.author}<br>${book.pages} pages</p>
            <a href="#" id="status">${book.status}</a>
        </div>
        <button id="delete-button">Delete Book</button>
    </div>`;

    bookCard.querySelector("#delete-button").addEventListener('click', function () {
        content.removeChild(bookCard);
        deleteFromLibrary(book);
    })

    bookCard.querySelector("#status").addEventListener("click", function() {
        if(book.status == "read") {
            book.status = "unread";
            bookCard.querySelector("#status").innerHTML = `${book.status}`;
        }
        else {
            book.status = "read";
            bookCard.querySelector("#status").innerHTML = `${book.status}`;
        }
    });
}
