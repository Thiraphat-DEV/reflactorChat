import io from "socket.io-client";
import "./App.css";
import anime from "animejs/lib/anime.es";
import Chat from "./components/Chat";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState(""); // ชื่อผู้ใช้
  const [room, setRoom] = useState(""); // ห้องเเชท
  const [show, setShow] = useState(false); // โชว์ห้องเเชท
  const animeText = anime({
    targets: ".inf-text",
    translateX: "-100%",
    duration: 100000,
    easing: "linear",
    loop: true,
  });
  const joinRoom = () => {
    //เข้าร่วมห้อง
    if (username !== "" && room !== "") {
      //ถ้ามีการเข้ามาในห้อง
      socket.emit("join_room", room); // ให้ทำการเข้าไปในห้องตามหมายเลขห้องที่ผู้ใช้กรอกเข้ามา
      setShow(true); //เเสดงห้องเเชท
    }
  };
  return (
    <div className="App">
      <div className="border-text">
        <div className="inf-text" onAnimationIteration={animeText}>
          {" "}
          <span>กิตติภัทร์ ยางคำ 038,&nbsp;</span>
          <span>ธีรภัทร์ จรเข้ 048,&nbsp;</span>
          <span>ภัทรภูมิ สายสิญจน์ 052,&nbsp;</span>
          <span>วชิรวิทย์ กุมเพ็ชร 054&nbsp;</span>
        </div>
      </div>
      {!show ? (
        <div className="joinChat">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Enter UserName"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Enter RoomID"
            onChange={(e) => setRoom(e.target.value)}
            required
          />

          <button onClick={joinRoom}>JOIN ROOM</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
