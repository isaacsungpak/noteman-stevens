import { useDispatch } from "react-redux";


function LoggedInHomePage({ sessionUser }) {

    return (
        <div id='logged-in-home-container'>
            <div id='stats-holder'>
                <p id='welcome-user'>Hey, {sessionUser.username}!</p>
            </div>

            <div id="scratchpad-container">
                {/* <input onChange={(e) => setPadTitle(e.target.value)} value={padTitle} type="text" placeholder="Note title" disabled={selectedNote === ''} className='note-page-title-input'/>
                <textarea onChange={(e) => setPadContent(e.target.value)} value={padContent} placeholder="Note content" disabled={selectedNote === ''} className='note-page-content-input'></textarea> */}
            </div>
        </div>
    )
}

export default LoggedInHomePage;
