{
    'use strict';

    const select = {
        wrapper: {
            booksList: '.books-list',
        },
        templateOf: {
            booksList: '#template-book',
        },
        class: {
            favouriteBook: 'favorite',
        }
    };
    const favoriteBooks = [];
    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    };


    const bookListWrapper = document.querySelector(select.wrapper.booksList);

    const render = function () {
        for (let book of dataSource.books) {
            const generatedHTML = templates.booksList(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            bookListWrapper.appendChild(element);
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
    }

    render();
    initActions();
}