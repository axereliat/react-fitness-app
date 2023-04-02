import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Hello, in this web app you can insert your workouts very easily.</h1>
            <Link to="/records/create"><span className="underline">Add your record here</span></Link>
            <br/>
            <Link to="/records"><span className="underline">See your records here</span></Link>
        </div>
    );
}

export default Home;
