//Toggle theme
const light = document.getElementById('light');
const dark = document.getElementById('dark');
const body = document.body;

window.addEventListener('load', checkTheme);


function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log(savedTheme);
    body.setAttribute('data-theme', savedTheme);
}

light.addEventListener('click', () => {
    console.log("light mode");
    setTheme('light');
});

dark.addEventListener('click', () => {
    console.log("dark mode");
    setTheme('dark');
});

// Adding a book

const addBtn = document.querySelector('.add-book');
const cancelBtn = document.querySelector('.cancel');
const popUp = document.querySelector('.popup');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const emptyState = document.querySelector('.empty-state');

addBtn.addEventListener('click', popDisplay);
cancelBtn.addEventListener('click',  popDisplay);


function popDisplay(){
    console.log("popup shown");
    popUp.style.display = popUp.style.display === 'block' ? 'none' : 'block';
    document.body.classList.toggle('opacity-bg')
}

const subBtn = document.querySelector('.submit');
const mainSec = document.querySelector('.main-section');

const myLibrary = [];

function Book(title,author,pages,hasRead){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.toggleStatus = function(){
    this.hasRead = !this.hasRead;
}

function toggleRead(id){
    const book = myLibrary.find(book => book.id === id);
    if (book){
        book.toggleStatus();
        displayBooks();
    }
}


function addBookToLibrary(title, author, pages, hasRead){
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayBooks();
}

function removeBook(id){
    const index = myLibrary.findIndex(book => book.id === id);
    if (index > -1){
        myLibrary.splice(index,1);
        displayBooks();
    }
}

function displayBooks(){
    mainSec.innerHTML = '';
    if (myLibrary.length === 0){
        mainSec.appendChild(emptyState);
        return;
    }

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add("book-card");

        card.dataset.id = book.id;

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = book.title;

        const cardAuthor = document.createElement('span');
        cardAuthor.classList.add('book-info');

        const authorIcon = document.createElement('span');
        authorIcon.className = "material-symbols-outlined";
        authorIcon.textContent = 'person_text';

        const authorText = document.createElement('span');
        authorText.classList.add('info-text');
        authorText.textContent = book.author;

        cardAuthor.append(authorIcon, authorText);

        const cardPages = document.createElement('div');
        cardPages.classList.add('book-info');

        const pageIcon = document.createElement('span');
        pageIcon.className= "material-symbols-outlined";
        pageIcon.textContent = 'book_ribbon'

        const pageText = document.createElement('span');
        pageText.classList.add('info-text');
        pageText.textContent =`${book.pages} pages`;

        cardPages.append(pageIcon, pageText);

        const readBtn = document.createElement('button');
        readBtn.classList.add('card-btn', 'read-btn');
        readBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span>'

        if (book.hasRead) {
            readBtn.classList.add('hasRead');
        } else {
            readBtn.classList.remove('hasRead');
        }

        readBtn.addEventListener("click",()=>toggleRead(book.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("card-btn", "delete-btn");
        deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        deleteBtn.addEventListener("click", () => removeBook(book.id));


        card.append(deleteBtn, readBtn, cardTitle, cardAuthor, cardPages);
        mainSec.appendChild(card);

        console.log("book added");

    });
    
}


const bookForm = document.querySelector('.form-container');

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const hasRead = readInput.checked;

    addBookToLibrary(title, author, pages, hasRead);
    bookForm.reset();
    popDisplay();
});