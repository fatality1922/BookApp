{
    'use strict';

    const select = {
        wrapper: {
            booksList: '.books-list',
            filters: '.filters',
        },
        templateOf: {
            booksList: '#template-book',
        },
        class: {
            favouriteBook: 'favorite',
        }
    };
    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    };


    class BooksList {

        constructor (){
            this.filters = [];
            this.favouriteBooks = [];
            this.getElements();
            this.render();
            this.initActions();
        }

        getElements(element) {
            const thisBookApp = this;
            thisBookApp.dom = {};
            thisBookApp.dom.wrapper = element;
    
            thisBookApp.dom.bookList = document.querySelector(select.wrapper.booksList);
            thisBookApp.dom.filters = document.querySelector(select.wrapper.filters);
    
        }

        render() {
            for (let book of dataSource.books) {
                const ratingBgc = this.determineRatingBgc(book.rating);
                const ratingWidth = book.rating * 10;
                const generatedHTML = templates.booksList({
                // eslint-disable-next-line
                 ...book,
                    ratingBgc,
                    ratingWidth,
                });
                const element = utils.createDOMFromHTML(generatedHTML);
                this.dom.bookList.appendChild(element);

                const ratingWrapper = element.querySelector('.book_rating_fill');
                ratingWrapper.style.background = ratingBgc;
                ratingWrapper.style.width = ratingWidth;
            }
        }

        initActions() {
            const thisBookApp = this;
            this.dom.bookList.addEventListener('dblclick', function (event) {
                event.preventDefault();
                const clickedElement = event.target.offsetParent;

                if (clickedElement.classList.contains('book__image')) {
                    const id = clickedElement.getAttribute('data-id');
                    if (!clickedElement.classList.contains(select.class.favouriteBook)) {
                        this.favouriteBooks.push(id);
                        clickedElement.classList.add(select.class.favouriteBook);
                    } else {
                        this.favouriteBooks.splice(this.favouriteBooks.indexOf(id), 1);
                        clickedElement.classList.remove(select.class.favouriteBooks);
                    }
                }
            });

            this.filterWrapper.addEventListener('click', function (event) {
                const clickedElement = event.target;
                if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
                    if (clickedElement.checked) {
                        thisBookApp.filters.push(clickedElement.value);
                        thisBookApp.filterBooks();
                    } else {
                        thisBookApp.filters.splice(thisBookApp.filters.indexOf(clickedElement.value), 1);
                        thisBookApp.filterBooks();
                    }
                }
            });
        }

        filterBooks() {
            const filters = []; //do konstruktora

            for (let book of dataSource.books) {
                const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
                let shouldBeHidden = false;
                for (let filterName of filters) {
                    if (!book.details[filterName]) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                if (shouldBeHidden) {
                    bookToBeHidden.classList.add('hidden');
                } else {
                    bookToBeHidden.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {

            let background = '';

            if (rating < 6) {
                background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
            }
            if (rating > 6 && rating <= 8) {
                background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
            }
            if (rating > 8 && rating <= 9) {
                background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
            }
            if (rating > 9) {
                background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
            }
            return background;
        }

    }
    const app = new BooksList();
    console.log(app);
}