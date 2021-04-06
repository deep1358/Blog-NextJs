import Head from 'next/head'
import '../styles/globals.css'
import {auth} from "../firebase"
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'

function MyApp({ Component, pageProps }) {

  const [user,setUser] = useState("")

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])

  return (
    <>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
          <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
          
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          

      </Head>
      <Navbar user={user}/>
      <Component {...pageProps} user={user} />

      
    </>
  )
}

export default MyApp
