import {useEffect,useRef} from "react"
import styles from "./imageForm.module.css"

// firestore 
import {db} from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 

// notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// function to render the Image form to add new images to imageList(within any album)
export default function ImageForm(props){

    const {albumId,updateImage,setUpdateImage,setShowImageForm} = props;
    const imageNameRef=useRef();
    const imageUrlRef=useRef();

    // check whether to update an image or not
    useEffect(()=>{
        if(updateImage){
            imageNameRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[updateImage]);

    // clear image data
    function clearForm(){
        imageNameRef.current.value=null;
        imageUrlRef.current.value=null;
        imageNameRef.current.focus();
    }

    // to update any image within the imagelist
    async function handleUpdateSubmit(e){
        e.preventDefault();
        const oldData={
            name:updateImage.name,
            link:updateImage.link
        };

        const newData={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'album', albumId);
         updateDoc(albumRef,{
            imageList:arrayUnion(newData)
        });
        
        updateDoc(albumRef,{
            imageList:arrayRemove(oldData),
            
        });

        toast.success(" Image Updated !")

        setUpdateImage(null);
        setShowImageForm(false);
        clearForm();
    }



    // add a new Image in Image list
    async function handleSubmit(e){
        e.preventDefault();

        const data={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'album', albumId);
        await updateDoc(albumRef,{
            imageList:arrayUnion(data)
        });

        toast.success("New Image Added to your Album!")
        clearForm();
    }

    return(
        <>
            <ToastContainer />
            {/* main container of the form  */}
            <div className="formContainer">
                {/* showing heading of the form with condition */}
                <h1>{!updateImage?"Add an Image":"Update Image"}</h1>
                
                {/* calling submit function on condition */}
                <form onSubmit={updateImage?handleUpdateSubmit:handleSubmit}>
                    
                    {/* for name of the image */}
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Name"
                        ref={imageNameRef}
                        required/>

                    {/* for image url */}
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Url"
                        ref={imageUrlRef}
                        required />
                    <br />

                    {/* to add/update image */}
                    <button className={`${styles.btn} ${styles.add}`}>
                            {/* show add or update on the button   */}
                        {!updateImage?"Add":"Update"}
                    </button>

                    {/* clear data inside the input box */}
                    <button className={`${styles.btn} ${styles.clear}`} 
                        onClick={clearForm}>Clear
                    </button>
                </form>
            </div>
        </>
    )
}