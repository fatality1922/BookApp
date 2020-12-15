{
    'use strict';

    const select = {
        wrapper: '.books-list',
        templateOf: {
            booksList: '#template-book',
        },
    },

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
      };

    const render = function () {
        for (let book of dataSource.books) {
            const generatedHTML = templates.booksList(book);
            console.log(generatedHTML);
            const element = utils.createDOMFromHTML(generatedHTML);
            booksListWrapper.appendChild(element);
        }
    };
    
    render();
}