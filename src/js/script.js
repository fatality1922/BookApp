{
    'use strict';

    const select = {
        wrapper: {
            booksList: '.books-list',
        },
        templateOf: {
            booksList: '#template-book',
        },
    };

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    };

    const bookListWrapper = document.querySelector(select.wrapper.booksList);
    const render = function () {
        for (let book of dataSource.books) {
            const generatedHTML = templates.booksList(book);
            console.log(generatedHTML);
            const element = utils.createDOMFromHTML(generatedHTML);
            bookListWrapper.appendChild(element);
        }
    };

    render();
}