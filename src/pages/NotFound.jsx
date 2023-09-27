import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="text-xl font-border">Oh No!</h1>
      <h2 className="font-border text-lg">Looks Like You are lost.</h2>
      <p>
        Luckily you are not alone. harry potter will return you to the home!
      </p>
      <Link to="/">
        <button>Go Back To Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
