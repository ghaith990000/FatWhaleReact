import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {firestore} from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const Dot = ({color}) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
  };
  return <span style={style}></span>
}
function App() {

  const [menus, setMenus] = useState([]);
  console.log(menus);
  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, "menus"),(snapshot) => {
      setMenus(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    }); 

    return unsub;
  }, []);
  return (
    <div className="">
      <button className='button'>New</button>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
          <a href='#'>
            edit <Dot color={menu.value}/> 
          </a>
          {menu.name}
        </li>
        ))}
        
      </ul>
    </div>
  );
}

export default App;
