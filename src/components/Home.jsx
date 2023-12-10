import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { getAnime } from '../utils/data'
import { FaStar } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import Swal from 'sweetalert2'
import { InsertCustomer } from '../supabase/insert'
import { Pagination } from '@mui/material'


const Home = () => {

    const [selectedAnime, setSelectedAnime] = useState(null);
    const [resultSearch, setResultSearch] = useState("")

    const handleBookNow = (anime) => {
        setSelectedAnime(anime);
        handleShow();
    };

  
    
    const [searchValue, setSearchValue] = useState('')
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!searchValue) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a search query!",
            })
        }
        setResultSearch(searchValue)
        console.log("data");
    }


    const [anime, setAnime] = useState([])

    const [page, setPage] = useState(anime.pagination?.current_page || 1);
    const [totalPages, setTotalPages] = useState(1000);
    const handlePagination = async (event, value) => {
        setPage(value);
    };

    const [show, setShow] = useState(false)

    const [name, setName] = useState("")
    const [date, setDate] = useState("")


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleName = (e) => setName(e.target.value)
    const handleDate = (e) => setDate(e.target.value)
    const handleSearch = (e) => setSearchValue(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !title || !duration || !type || !date) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            })
            return;
        }
        const { error } = await InsertCustomer(name, selectedAnime.title, selectedAnime.duration, selectedAnime.type, date,)
        if (!error) {
            handleClose()
            console.log(anime.title);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Successfully added ${selectedAnime.title} to your list`,
                showConfirmButton: false,
                timer: 3000,
            })
        } else {
            handleClose()
            alert(`Error: ${error}`);
        }
    }

    // short word
    const short = (str, maxLength, trunc) => {
        if (str.length > maxLength) {
            return `${str.substring(0, trunc)}...`
        } else {
            return str;
        }
    }

    useEffect(() => {
        const api = async () => {
            const data = await getAnime(page, resultSearch)
            console.log(page);
            if (data && data.pagination) {
                setAnime(data.data);
                setTotalPages(data.pagination.last_visible_page);
            }
            console.log(data);
        }
        api()
    },[page,resultSearch])

  return (
    <>
    <Header/>
    <section className='bg-home-image h-screen bg-no-repeat bg-cover bg-center'>
        <div className="backdrop-brightness-50 w-full h-full flex items-center justify-center text-center">
            <h2 className='text-white text-6xl font-black'>
                WELCOME <br /> TO OUR <br /> TEATHER
            </h2>
        </div>

    </section>
    {/* section search */}
    <section>
    <div className="form-search flex justify-center items-center my-10 flex-col">
            <form onSubmit={onSubmitHandler}>
                <input 
                type="text" 
                placeholder=" Search"
                className='border-2 p-2 rounded-md w-80 border-black'
                value={searchValue} 
                onChange={handleSearch}
                />
                <button type='submit' className='bg-black text-white p-2 ml-2 border-2 rounded-md'>Search</button>
            </form>
    </div>

    </section>

    {/* section list film */}
    <section >
    <div className="flex flex-wrap gap-3 m-3">
        {
            anime.map(i => (

                <div class="max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <img class="rounded-t-lg w-full h-72" src={i.images.jpg.image_url} alt="" />
                    <div class="p-5">
                        <h5 class="mb-2 text-2xl font-bold text-gray-900 text-white">{i.title} <br/> {i.title_japanese}</h5>
                        <h9 class="mb-2 font-bold text-gray-900 text-white flex"><FaStar className="me-2 mt-1"/>{i.score} <MdWatchLater className="me-2 ms-8 mt-1"/>{i.duration}</h9>
                        {i.synopsis !== undefined && i.synopsis !== null && (
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{short(i.synopsis, 100, 100)}</p>

                        )}
                        <button
                            href="#"
                            onClick={() => handleBookNow(i)}
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Pesan Sekarang
                        </button>;
                        <form onSubmit={handleSubmit}>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Booking your Ticket here!</Modal.Title>
                                </Modal.Header>
                            <Modal.Body>
                            <form>
                                <div className="mb-4">
                                    <label for="username" className="block text-gray-600 text-sm font-medium mb-2"  >Username</label>
                                    <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-md" onChange={handleName} />
                                </div>

                                <div className="mb-4">
                                    <label for="date" className="block text-gray-600 text-sm font-medium mb-2"  >Date</label>
                                    <input type="date" id="date" name="date" className="w-full px-3 py-2 border rounded-md" onChange={handleDate} />
                                </div>

                                <div className="mb-4">
                                    <label for="title" className="block text-gray-600 text-sm font-medium mb-2" >Title</label>
                                    <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-md" value={selectedAnime ? selectedAnime.title : ""} disabled/>
                                </div>

                                <div className="mb-4">
                                    <label for="duration" className="block text-gray-600 text-sm font-medium mb-2" >Duration</label>
                                    <input type="text" id="duration" name="duration" className="w-full px-3 py-2 border rounded-md" value={selectedAnime ? selectedAnime.duration : ""} disabled/>
                                </div>

                                <div className="mb-4">
                                    <label for="type" className="block text-gray-600 text-sm font-medium mb-2" >Type</label>
                                    <input id="type" name="type" type='text' className="w-full px-3 py-2 border rounded-md" value={selectedAnime ? selectedAnime.type : ""} disabled/>
                                </div>

                                <div className="mt-6">
                                    <button type="submit"
                                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                        Book
                                    </button>
                                </div>
                            </form>
                            </Modal.Body>
                            </Modal>

                        </form>
            
                    </div>
                </div>
           
            ))
        }
        
    </div>
    </section>

    <div className="flex justify-center py-6">
        <Pagination count={totalPages} page={page} onChange={handlePagination}/>
    </div>

    <Footer/>
    </>
    
  )
}

export default Home