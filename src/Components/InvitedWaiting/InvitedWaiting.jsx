import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavAdmin from '../NavAdmin/NavAdmin';

export default function InvitedWaiting() {
    useEffect(()=>{
        getWaitingListsAdmin()
      },[])
    const [waitingList,setWaitingList]=useState('')
    async function getWaitingListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/invatation/get-invitations-wait',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const waitingList = response;
          console.log(waitingList)
          setWaitingList(waitingList)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>yy</div>
    </>
  )
}
