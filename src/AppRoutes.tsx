import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { TablePage } from "./Pages/TablePage/TablePage";
import { Home } from "./Pages/Home/Home";
export const AppRoutes = () => {
   return (
      <>

         <main>
            <Routes>
               <Route path="/" element={<Home />} />

               <Route path="/login" element={<LoginPage />} />
               <Route path="/table" element={<TablePage />} />
            </Routes>
         </main>

      </>
   );
};
