// // utils/ProtectedRoute.jsx
// import { Navigate, Outlet } from "react-router-dom"
// // import { useEffect } from "react"

// const ProtectedRoute = () => {

//   // useEffect(() => {
//   //   window.history.pushState(null, document.title, window.location.href)
//   //   window.addEventListener('popstate', () => {
//   //     window.history.pushState(null, document.title, window.location.href)
//   //   })
//   // }, [])
  

//   // const token = localStorage.getItem("accessToken")
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   // if (!token) {
//   //   return <Navigate to="/login" replace />
//   // }

//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
// }

// export default ProtectedRoute
