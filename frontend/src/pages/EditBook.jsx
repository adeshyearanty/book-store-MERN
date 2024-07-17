import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`https://book-store-mern-adesh.onrender.com/books/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear);
            })  
            .catch((error) => {
                console.log(error);
            })      
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        }

        axios
            .put(`https://book-store-mern-adesh.onrender.com/books/${id}`, data)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                alert("Error! Please check the console.");
            })
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input 
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input 
                        type="number"
                        value={publishYear}
                        onChange={(event) => setPublishYear(event.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default EditBook;