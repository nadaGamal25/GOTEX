import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function InvocesMarkter() {
    useEffect(()=>{
        getInvoces()
      },[])
      const [invoces,setInvoces]=useState([])
    
      async function getInvoces() {
        try {
          const response = await axios.get('http://83.136.219.95/test/daftra/get-all-markter-invoices',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response.data.data)
          setInvoces(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div>InvocesMarkter</div>
  )
}
