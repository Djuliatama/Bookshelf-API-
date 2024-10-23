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

const allBooks = [
    {
        id: "4j21vYIP22jF6s7MvbIpb",
        name: "New Boook",
        publisher: "Publisher Name"
    },
    {
        id: "1L7ZtDUFeGs7VlEt",
        name: "Buku B",
        publisher: "Dicoding Indonesia"
    },
    {
        id: "K8DZbfI-t3LrY7lD",
        name: "Buku C",
        publisher: "Dicoding Indonesia"
    }
 ];

const getAllBooks = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: {
            books: allBooks
        }
    });
}

const getById = (req, res) => {
    const { bookId } = req.params;
    const book = allBooks.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            status: "fail",
            message: "Buku tidak ditemukan"
        });
    }

    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    });
}

const updateById = (req, res) => {
    const { bookId } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if(!name) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
    }
    
    const book = allBooks.findIndex(book => book.id === bookId);

    console.log("Book ID dari params:", bookId);
    console.log("Id yang avail:", allBooks.map(book => book.id));


    if (!book) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
    }

    allBooks[book] = {
            ...allBooks[book], 
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt: new Date().toISOString()
        };

    return res.status(200).json({
        status: "success",
        message: "Buku berhasil diperbarui"
    });
};

const deleteById = (req, res) => {
    const { bookId } = req.params;
    const book = allBooks.findIndex(book => book.id === bookId);
    if(!book) {
        return res.status(404).json({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        });
    } 
    
    allBooks.splice(book, 1);

    return res.status(200).json({
        status: "success",
        message: "Buku berhasil dihapus"
    });
};

module.exports = {
    createBook,
    getAllBooks,
    getById,
    updateById,
    deleteById,
}