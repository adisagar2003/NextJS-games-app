import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from "@/styles/Create.module.css";
import SignInModal from '@/components/SignInModal';
import { withIronSessionSsr } from "iron-session/next";
import ImageFileInput from '@/components/ImageFileInput';
import Image from 'next/image';

function create(props) {
    const [signInModal, setSignInModal] = useState(false);
    const [title ,setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [short_description, setShortDescription] = useState("");
    const [game_url, setGameUrl] =useState("");
    const [genre, setGenre] = useState("");
    const [platform , setPlatform] = useState("");
    const [developer, setDeveloper]= useState("");
    const [freetogame_profile_url, setFreeProfileUrl] = useState("");
    const [publisher, setPublisher] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(()=>{
        if (!props.user.email){
        location = '/'
        }
    }, [])
    const gameData ={
        title: title,
    thumbnail: thumbnail,
    short_description: short_description,
    game_url: freetogame_profile_url,
    genre: genre,
    platform: platform,
    publisher: publisher,
    developer: props.user.email,
    freetogame_profile_url: freetogame_profile_url,
      }

      const urls = files.map((file) => URL.createObjectURL(file));

    useEffect(()=>{
        console.log(props.user.email);
    },[]);
    async function registerGame(data){
        const response = await fetch("/api/games", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
          });


    }
    return (
        <>
        {signInModal && <SignInModal setSignInModal={setSignInModal} />}
        <Navbar setSignInModal={setSignInModal} user={props.user}  />
        
        <div className={styles.createGameLayout}>
        <div className={styles.backgroundImage}>
              
        </div>
        <div className={styles.registerLayout}>
        {urls.map((url, i) => {
        const filename = files[i].name; // image-1.jpg
        console.log(url); // blob:http://localhost:3000/ea1f5af2-d00f-4090-a4c9-538799f065d2
        return (
          <Image src={url} height={300} width={240} key={i} alt={filename} />
        );
      })}
            <ImageFileInput onFilesChange={(selectedFiles)=>setFiles(selectedFiles)} />
          <h4>Upload your creations</h4>
          <div className={styles.formContent}>
            <input placeholder="Title" type="text"  onChange={(e)=>setTitle(e.target.value)} />
            <input placeholder='Description' type="text" onChange={(e)=>setShortDescription(e.target.value) } />
            <input placeholder="Publisher Name" type="text"  onChange={(e)=>setPublisher(e.target.value)} />
            <input placeholder="GameUrl" type="text" onChange={(e)=>setFreeProfileUrl(e.target.value)} />
            <input placeholder="Genre" type="text" onChange={(e)=>setGenre(e.target.value)} />
            <button onClick={registerGame}>Register</button>
          </div>

        </div>
      </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      if (!user) {
        return {
          props: {
            user: false,
          },
        };
      }
      return {
        props: {
          user: req.session.user,
        },
      };
    },
    {
      cookieName: "access_token",
      password: process.env.NEXT_PUBLIC_COOKIE_SECRET,
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    }
  );

export default create