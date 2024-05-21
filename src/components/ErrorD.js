import { useRouteError,Link } from "react-router-dom";
const ErrorD=() =>{
    const err=useRouteError();
    return (
        <>
        
        <div>
            <h1>Error 404 not Found</h1>
            <h2>{err.data}</h2>

            <Link to="/">Back Home</Link>
        </div>
        </>
    )
}

export default ErrorD;