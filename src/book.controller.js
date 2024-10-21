const { nanoid } = require('nanoid');         

let books = []; 

const createBook = (req, res) => {
    console.log("ini request")
    console.log(req.body);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if(!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambah buku. Mohon isi nama buku',
        });
    }

    if(readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    //objek untuk buku 
    const id = nanoid();
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt:  new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    books.push(newBook);

    res.setHeader('Content-Type', 'application/json');

    return res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
};


module.exports = {
    createBook,
}