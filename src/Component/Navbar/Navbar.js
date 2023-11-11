import styles from  "./navbar.module.css"

//Nav bar of page
export default function Navbar(){
    return(
        <>
            <div className={styles.navbar}>
                <img className={styles.coverImage} src={require("../../files/Images/logo_4.png")} alt="album" />
                <span>PhotoAlbum</span>
            </div>
        </>
    )
}