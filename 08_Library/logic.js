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