import { useEffect, useState } from "react";
import { fetchData } from "../store/tableSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import "./table.scss";

export const Table = () => {
   const { data } = useAppSelector((state) => state.table);
   const dispatch = useAppDispatch();
   const { results, previous, next } = data;
   const [url, setUrl] = useState("https://technical-task-api.icapgroupgmbh.com/api/table/");
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      dispatch(fetchData(url));
   }, [dispatch, url]);

   const handlePrevious = () => {
      if (previous) {
         setUrl(previous);
         setOffset(offset - 10);
      }
   };

   const handleNext = () => {
      if (next) {
         setUrl(next);
         setOffset(offset + 10);
      }
   };

   const totalPages = data.count ? Math.ceil(data.count / 10) : 0;

   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


   const handlePageClick = (page: number) => {
      const newOffset = (page - 1) * 10;
      setOffset(newOffset);
      const pageUrl = `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${newOffset}`;
      setUrl(pageUrl);
   };

   return (
      results ? (
         <>
            <table>
               <thead>
                  <tr className="table-headers">
                     <th>Name</th>
                     <th>Email</th>
                     <th>Birthday</th>
                     <th>Phone number</th>
                     <th>Address</th>
                  </tr>
               </thead>
               <tbody>
                  {results.map((item: any) => (
                     <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.birthday_date}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.address}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <div className="pagination">
               <button onClick={handlePrevious} disabled={!previous} className="pagination-btn">
                  Previous Page
               </button>
               {pageNumbers.map((page) => (
                  <button
                     key={page}
                     onClick={() => handlePageClick(page)}
                     className={`pagination-btn ${offset / 10 + 1 === page ? "active" : ""}`}
                  >
                     {page}
                  </button>
               ))}
               <button onClick={handleNext} disabled={!next} className="pagination-btn">
                  Next Page
               </button>
            </div>

            <div className="info">Привіт! Мене звуть Єгор. Вже більше року я займаюсь програмуванням та кожного дня вдосконалюю власні навчики. Буду дуже радий приєднатися до команди професіоналів. Я впевнений, що принесу багато користі та ми буде плідно працювати разом. Дякую!</div>
         </>
      ) : (
         <div>Loading...</div>
      )
   );
};
