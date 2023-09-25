import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";

function CharacterDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Header>
        <span></span>
        <button onClick={() => navigate("/")} className="text-white bg-red-300">
          Back to Home
        </button>
      </Header>
      <section>
        <div>
          <img src="" alt="" />
        </div>
        <div>detals...</div>
      </section>
    </div>
  );
}

export default CharacterDetails;
