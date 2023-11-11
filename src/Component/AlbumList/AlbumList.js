import { useEffect, useState } from "react"
import styles from "./albumlist.module.css"

// for render 
import Album from "../Album/Album"
import AlbumForm from "../AlbumForm/AlbumForm"
import ImageList from "../ImageList/ImageList"

// firestore database
import { db } from "../../firebaseInit"
import { collection, onSnapshot} from "firebase/firestore";


// function to show all the album in database and render form to add a new album in list
export default function AlbumList(){

    
    const [albumList,setAlbumList] = useState([]);
    const [showAlbumForm,setShowAlbumForm]=useState(false);
    const [openAlbum,setOpenAlbum]=useState({albumId:"",open:false});


    // get data from Database 
    useEffect(()=>{

        // getting realtime updates from database
        const unsub = onSnapshot(collection(db, "album"), (snapShot) => {
            const card = snapShot.docs.map((doc) => {
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            console.log(card);
            // storing all the albums in local state 
            setAlbumList(card);
        });
    },[]);


    return(
        <>
            {/* main container */}
            <div className={styles.mainContainer}>

                {/* whether to open any album or not */}
                {!openAlbum.open?(

                    <>
                        {/* conditional render albumform to add new album */}
                        <div className={styles.albumForm}>
                            {showAlbumForm && <AlbumForm />}
                        </div>

                        <div className={styles.header}>
                            <span>Your Albums</span>
                            {/* button to show or hide album form  */}
                            <button className={styles.btn} 
                                onClick={()=>setShowAlbumForm(!showAlbumForm)}>
                                    {!showAlbumForm?"Create Album":"Cancel"
                            }</button>
                        </div>


                        <div className={styles.albumContainer}>
                            {/* looping over all the albums in array and showing them one by one */}
                            {albumList.map((card,i)=> <Album key={i} 
                                                        info={card} 
                                                        setOpenAlbum={setOpenAlbum}/>)}
                        </div>
                    
                    </>

                ):<ImageList openAlbum={openAlbum} 
                            setOpenAlbum={setOpenAlbum} />}

            </div>
        </>
    )
}