const light = document.getElementById('light');
const dark = document.getElementById('dark');
const body = document.body;

window.addEventListener('load', checkTheme);


function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    checkTheme();
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

const myLibrary = [];

function Book(title, author,pages,read){
    id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){

}