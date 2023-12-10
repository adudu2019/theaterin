import React, {useEffect, useState} from 'react'
import { ReadCustomer, deleteCustomer } from '../supabase/insert'
import Swal from 'sweetalert2';

const Booking = () => {

    const [insert, setInsert] = useState([])

    useEffect(() => {
        const api = async () => {
          const { movie, error } = await ReadCustomer();
          if (error) {
            console.error(error);
          } else {
            setInsert(movie)
            // Perbarui state atau lakukan logika lain di sini
          }
        };
        api();
    }, []);

    const tes = () => {
      alert(insert);
    }
    
    const handleCancelBooking = async (id) => {
      // confirm cancel book
      await Swal.fire({
          title: `Are you sure to Cancel Booking?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Cancel it!'
      }).then(async (result) => {
          if (result.isConfirmed) {
              const { error } = await deleteCustomer(id)
              if (!error) {
                  await Swal.fire({
                      title: 'Success!',
                      text: `Your booking has been cancelled`,
                      icon: 'success',
                      timer: 2000,
                      showConfirmButton: false,
                      timerProgressBar: true
                  })
                  window.location.reload()
              } else {
                  Swal.fire({
                      title: 'Error!',
                      text: `${error.message}`,
                      icon: 'error',
                      timer: 3000,
                      showConfirmButton: false
                  })
              }
          } else {
              Swal.fire({
                  title: 'Canceled!',
                  text: `Your booking is safe!`,
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
              })
          }
      })
  }

  return (
    <>
    <h3 class="mb-4 font-black text-gray-900 text-center mt-4"> This is your ticket! <br /> Enjoy your film </h3>
    <div className="flex flex-wrap gap-3 m-3">
        {
            insert.map(i => (
                <div class="max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-5">
                        <h3 class="mb-4 font-bold text-gray-900 text-white"> This your ticket! <br /> Enjoy your film </h3>
                        <h5 class="mb-2 text-2xl font-bold text-gray-900 text-white"> {i.name} </h5>
                        <h9 class="mb-2 font-bold text-gray-900 text-white flex"> {i.date} </h9>
                        <h9 class="mb-2 font-bold text-gray-900 text-white flex"> {i.title_film} </h9>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{i.duration} <br /> {i.varian_film}</p>

                        <div className="mt-6">
                            <button 
                                onClick={() => handleCancelBooking(i.id)} type='button' className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-red-800">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))
        }     
    </div>
    </>
  )
}

export default Booking