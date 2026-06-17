import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log(token);

      const response = await axios.get(
        "http://localhost:5000/api/repositories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>DevLens Dashboard</h1>

      <h2>
        Repositories Synced:
        {repos.length}
      </h2>

      {repos.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>

          <p>
            Language:
            {repo.language}
          </p>

          <p>
            Stars:
            {repo.stars}
          </p>

          <Link to={`/repository/${repo.id}`}>{repo.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
