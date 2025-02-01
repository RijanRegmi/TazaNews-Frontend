import profilepic from './assets/TazaNews.png'

function Card(){
    return(
        <div className="card">
            <img src={profilepic} alt="Profile Picture" />
            <h2>TazaNews</h2>
            <p>TazaNews is a News website</p>
        </div>
    )
}
export default Card