import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("x-Auth-token");
  if (isAuth) {
    return <section>
      <h1>This Route is Protected</h1>
      {children}
    </section>;
  } else {
    return <Navigate replace to='/login' />;
  }
}
