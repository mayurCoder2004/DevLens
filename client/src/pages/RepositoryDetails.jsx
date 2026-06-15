import { useParams } from "react-router-dom";

const RepositoryDetails = () => {

  const { id } =
    useParams();

  return (
    <div>
      Repository ID:
      {id}
    </div>
  );
};

export default RepositoryDetails;