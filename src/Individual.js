import { useState, useEffect } from "react";
import axios from "axios";

const Individual = ({ url }) => {
  const [individualDetails, setIndividualDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let fetchIndividualDetails = async () => {
      try {
        const { data } = await axios.get(url);
        setIndividualDetails(data);
      } catch (err) {}
    };

    fetchIndividualDetails();
  }, [url]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!individualDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div onClick={toggleDetails} style={{ cursor: "pointer" }}>
      <h3>Name: {individualDetails.name}</h3>
      {showDetails && (
        <>
          <p>Height: {individualDetails.height}</p>
          <p>Weight: {individualDetails.weight}</p>
          <p>Base Experience: {individualDetails.base_experience}</p>
          <p>URL: {url}</p>
        </>
      )}
    </div>
  );
};

export default Individual;
