import { createContext, useState } from "react" 


const UserContext = createContext(null) 

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
    fetch("http://localhost:5555/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((user) => {
        if (user) {
          setCurrentUser(user);
        }
      });
  }, []);
    
    return ( 
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children} </UserContext.Provider>
      )
    } 
    export { UserContext, UserProvider };