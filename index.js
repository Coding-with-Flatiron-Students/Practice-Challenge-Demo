const bookList = document.getElementById("book-list")
const genreSearch = document.getElementById("genre-input")
const filterBtn = document.getElementById("filter-button")
let books

// 1. When the page loads, list each book title and genre on the page - use the provided container. You will need to make sure that your json server is running and fetch the data there.

/**
 * DOMContentLoaded
 * 1. Fetch call => url(http://localhost:3000/books)
 * 2. After my .thens I'm going to listing the books out
 *         <div>
 *              <h4> Title </h4>
 *              <p> Genre </p>
 *         </div>
 *         Whats the action of listing it out?
 *      a. Iterate through my bookArray (book)
             Create a div element
             Create an h4 element === title
             Create a p tag element === genre

             Fill in the data for the elements that I'm creating

             append my div onto the bookList
            append my h4 and p to the div element
 */

/**
 *  2. When a book title is clicked the books's author should be added to the page under the book's genre. 
 *     When the  title is clicked again the author should be removed.
 * 
 *     A. Add Event listener to my h4 tag
 *     B. Its gonna have a call back fn => showAuthor
 *     C. showAuthor: 
 *               if(showAuthor === ){
 *                  author to show up
 *               } else {
 *                   author to be removed
 *               }
 */

/**
 * 
 * // 3. Next write the code that will allow users to enter a genre into the input field, 
 *      click the filter button and then see only the books that have that genre.
 * 
 *      #Use filter to find the books within a certain genre
 *      #forEach to find books and render the book
 * 
 *     1. addEventLister to my filterBtn
 *     2. Action => Use the input's value to iterate and check through each obj
 *             -- If the object has the genre then render it
 *             --- else ignore it
 */

/**
 * 1. What is my original Data look like?
 *       => If there isn't a place to store that data
 *       => Update my backend to include that key that I'm to add
 *  2. Do I something that's already render my cards? Yes
 * 
 *  3. AddEventListerer to a btn 
 *       a. Action for that btn be a fetch(PATCH)
 *       b. PATCH needs an id
 *       c. In the body of the PATCH {likes: book.likes + 1}
 *       d. In my last .then => updatedBook use that to update where in the DOMElements its mentioning the likes
 *       e. Also have update in my books(array that I have), because if I were to use filter btn I need my persitted data to show up
 */



function showAuthor(bookCard, bookAuthor){
    if(bookAuthor.className === "hidden"){
        bookAuthor.className = "unhidden"
        bookCard.append(bookAuthor)
    } else {
        bookAuthor.className = "hidden"
        bookAuthor.remove()
    }
}

filterBtn.addEventListener("click", ()=> {
    bookList.innerText = ""
    const inputValue = genreSearch.value.toLowerCase()

    books.forEach(book => {
        if(book.genre.toLowerCase() === inputValue){
            renderBookFn(book)
        }
    })
})

function renderBookFn(book){
    const bookCard = document.createElement("div")
    const bookTitle = document.createElement("h4")
    const bookGenre = document.createElement("p")
    const bookAuthor = document.createElement("p")
    

    bookTitle.textContent = book.title
    bookGenre.textContent = book.genre
    bookAuthor.textContent = book.author
    bookAuthor.className = "hidden"

    bookTitle.addEventListener("click", () => showAuthor(bookCard, bookAuthor))

    bookList.append(bookCard)
    bookCard.append(bookTitle, bookGenre)

}

function fetchBooks(){
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(bookArray => {
        bookArray.forEach(book => renderBookFn(book))
        books = bookArray
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const resetBooks = document.createElement("button")
    resetBooks.innerText = "Reset"
    const body = document.querySelector("body")
    body.insertBefore(resetBooks, bookList)

    fetchBooks()

    resetBooks.addEventListener("click", () => {
        fetchBooks()
    })
   
})