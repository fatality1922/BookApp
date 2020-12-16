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
    const favoriteBooks = [];
    const filters = [];
    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    };

    const bookListWrapper = document.querySelector(select.wrapper.booksList);
    const filterWrapper = document.querySelector(select.wrapper.filters);

    const render = function () {
        for (let book of dataSource.books) {
            const generatedHTML = templates.booksList(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            bookListWrapper.appendChild(element);
            const ratingBgc = determineRatingBgc(book.rating);
            const ratingWidth = book.rating * 10;
            booksList.classList.book_rating_fill.style.background = ratingBgc;
            booksList.classList.book_rating_fill.style.width = ratingWidth;
        }
    };

    const initActions = function () {
        bookListWrapper.addEventListener('dblclick', function (event) {
            event.preventDefault();
            const clickedElement = event.target.offsetParent;

            if (clickedElement.classList.contains('book__image')) {
                const id = clickedElement.getAttribute('data-id');
                if (!clickedElement.classList.contains(select.class.favouriteBook)) {
                    favoriteBooks.push(id);
                    clickedElement.classList.add(select.class.favouriteBook);
                } else {
                    favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
                    clickedElement.classList.remove(select.class.favouriteBook);
                }
            }
        });

        filterWrapper.addEventListener('click', function (event) {
            const clickedElement = event.target;
            if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
                if (clickedElement.checked) {
                    filters.push(clickedElement.value);
                    filterBooks();
                } else {
                    filters.splice(filters.indexOf(clickedElement.value), 1);
                    filterBooks();
                }
            }
        });
    };

    const filterBooks = function () {
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
    };

    const determineRatingBgc = function (rating) {

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
    };

    render();
    initActions();
}