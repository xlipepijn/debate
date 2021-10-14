import Lobby from '../Containers/Lobby'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import CreateConversation from '../components/CreateConversation'
import Avatar from '../components/Avatar'
import logo from "../images/logo.png";
import { IoReload } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import {IconContext} from 'react-icons'
import { getJoinedConversation } from "../API/Calls";


const Home = ({color1, color2, color3, userId}) => {
  let history = useHistory();
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      getJoinedConversation(userId)
        .then((json) =>
          history.push(`chat/${JSON.stringify(json._id.$oid).slice(1, -1)}`)
        )
        .catch((err) =>
          console.log(`User has not joined a conversation yet: ${err}`)
        );
    }, [userId]);


const createUser = () => {
  localStorage.setItem("color1", getRandomColor());
  localStorage.setItem("color2", getRandomColor());
  localStorage.setItem("color3", getRandomColor());
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getNextPage = () => {
  setPage(page + 1);
};

const toggleModal = () =>{
  setShowModal(!showModal)
}


    return (
      <div className="App padding-bottom">
        <div className="header">
          <div className="top-profile">
            <div style={{ marginLeft: "5px", marginRight: "10px" }}>
              <Avatar
                size="40px"
                color1={color1}
                color2={color2}
                color3={color3}
              />
            </div>
            <a href="/" id='reshuffle-avatar-button' style={{ cursor: "pointer" }} onClick={createUser}>
              Reshuffle your avatar
            </a>
          </div>
          <img
            src={logo}
            style={{height:'39.67', width: "250px", marginTop: "20px", marginBottom: "20px" }}
          />
          <div id='header-filler' style={{ width: "190px" }}></div>
        </div>
        <div className='contents-page'>
        <div className="title-container">
          <h1 style={{ marginBottom: "10px" }}>Join or start a discussion</h1>
          <p>
            Challenge someone's believe by entering with them in a chat or start a discussion yourself by pressing 'start your own
            disussion'
          </p>
          <div id='home-buttons-container' style={{ marginBottom: "60px", display: "flex" }}>
            <button
              onClick={toggleModal}
              style={{ marginTop: "25px", marginRight: "5px" }}
              className="secundairy-button flex"
            >
              <IconContext.Provider value={{ className: "icons" }}>
                <AiOutlinePlus />
              </IconContext.Provider>
              Start my own discussion
            </button>
            <button
              style={{ marginTop: "25px", marginLeft: "5px" }}
              className="secundairy-button-outlined flex"
              onClick={getNextPage}
            >
              <IconContext.Provider value={{ className: "icons-black" }}>
                <IoReload />
              </IconContext.Provider>
              Show me other discussions
            </button>
          </div>
        </div>
        <Lobby getNextPage={getNextPage} page={page} setPage={setPage} history={history} />

        {showModal && (
          <CreateConversation
            userId={userId}
            color1={color1}
            color2={color2}
            color3={color3}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </div>
    );
}

export default Home
