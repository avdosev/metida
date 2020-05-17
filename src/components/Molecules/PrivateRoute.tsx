import React from "react";

// function PrivateRoute({ children, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 fakeAuth.isAuthenticated ? (
//                     children
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }