import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get('https://book-store-mern-adesh.onrender.com/books')
            .then((res) => {
                setBooks(res.data.data);
                console.log(books);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <table className='w-full border-seperate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600'>No</th>
                        <th className='border border-slate-600'>Title</th>
                        <th className='border border-slate-600 max-md:hidden'>Author</th>
                        <th className='border border-slate-600 max-md:hidden'>PublishYear</th>
                        <th className='border border-slate-600'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 text-center'>{index + 1}</td>
                            <td className='border border-slate-700 text-center'>{book.title}</td>
                            <td className='border border-slate-700 text-center max-md:hidden'>{book.author}</td>
                            <td className='border border-slate-700 text-center max-md:hidden'>{book.publishYear}</td>
                            <td className='border border-slate-700'>
                                <div className="flex justify-center gap-x-4">
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800'/>
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <AiOutlineDelete className='text-2xl text-yellow-600'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home