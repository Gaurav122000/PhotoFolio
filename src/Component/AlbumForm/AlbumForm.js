import { useRef } from "react";
import styles from "./albumform.module.css";

//for firebase
import {db} from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore"; 

//for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// form to add a new album in Albumlist
export default function AlbumForm(){

    const nameRef=useRef();

    function clearForm(e){
        e.preventDefault();
        nameRef.current.value="";
        nameRef.current.focus();
    }

    // add a new album inside the database
    async function handleSubmit(e){
        e.preventDefault();

        const docRef = await addDoc(collection(db, "album"),{
            Albumname:nameRef.current.value,
            imageList:[],
            }
        );

        toast.success("New Album added!.");
        nameRef.current.value="";
        nameRef.current.focus();
    }

    return(
        <>
            <ToastContainer />
            {/* main form container  */}
            <div className="formContainer">
                <h1>Create an Album</h1>

                <form onSubmit={handleSubmit}>
                    {/* input box */}
                    <input type="text" 
                        placeholder="Name" 
                        ref={nameRef} 
                        required
                        className={styles.input} />
                    
                    {/* delete data from input box  */}
                    <button className={`${styles.formBtn} ${styles.clearBtn}`} 
                        onClick={clearForm}>Clear
                    </button>

                    {/* submit form and create a new album */}
                    <button className={`${styles.formBtn} ${styles.addBtn}`}>Add</button>
                </form>
            </div>
        </>
    )

}