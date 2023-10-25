
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"



export const Home = () => {

   const { message } = useSelector((state) => state.login.data)

   return (
      <>

         <section className="home">
            {message === "Authentication successful." ? <Navigate to={"/table"} /> : <Navigate to={"/login"} />}
         </section>
      </>
   );
}
