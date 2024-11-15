import React from 'react';
import { Button } from '@mui/material';

const Pagination = ({totalImages,ImagePerPage,handlePageChange}) => {

    let pages = [];

    for (let i = 1; i < Math.ceil(totalImages/ImagePerPage);i++){
        pages.push(i)



    }

  const handleClick = (pageNumber) => {
    handlePageChange(pageNumber);
  };
  return (
    <div>
  {
pages.map((page,index) => {
return <Button variant="contained" key={index} onClick={handleClick} >{page}</Button>




})



  }




    </div>
  )
}

export default Pagination

// import React, { useEffect, useState } from "react";

// const MuiPagination = () => {
//   const [apiData, setApiData] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [records, setRecords] = useState();
//   const [npages, setNPages] = useState();
//   const recordsPerPage = 30;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const [numbersArray, setNumbersArray] = useState();
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch("https://jsonplaceholder.typicode.com/comments")
//         .then((res) => res.json())
//         .then((data) => setApiData(data));
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const func = async () => {
//       if (apiData) {
//         const displayRecords = await apiData?.slice(firstIndex, lastIndex);
//         setRecords(displayRecords);
//         const npagesLength = Math.ceil(apiData?.length / recordsPerPage);
//         setNPages(npagesLength);
//         const pageNumbersArray = [...Array(npagesLength + 1).keys()].slice(1);
//         setNumbersArray(pageNumbersArray);
//       }
//     };
//     func();
//   }, [apiData, npages, currentPage]);
//   const prePage = () => {
//     if (currentPage !== firstIndex + 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const nextPage = () => {
//     if (currentPage !== npages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const changePage = (id) => {
//     setCurrentPage(id);
//   };
//   return (
//     <>
//       <div>MuiPagination</div>
//       {records?.map((item) => {
//         return (
//           <div key={item.id} style={{ display: "flex" }}>
//             <h4 style={{ margin: "0 10px" }}>{item.id}</h4>
//             <h4 style={{ margin: "0 10px" }}>{item.name}</h4>
//           </div>
//         );
//       })}
//       <nav aria-label="Page navigation example">
//         <ul className="pagination">
//           <li className="page-item">
//             <a href="#" className="page-link" onClick={prePage}>
//               Prev
//             </a>
//           </li>
//           {numbersArray?.map((n, i) => (
//             <li
//               key={i}
//               className={`page-item ${currentPage == n ? "active" : ""}`}
//             >
//               <a href="#" className="page-link" onClick={() => changePage(n)}>
//                 {n}
//               </a>
//             </li>
//           ))}
//           <li className="page-item">
//             <a href="#" className="page-link" onClick={nextPage}>
//               Next
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default MuiPagination;