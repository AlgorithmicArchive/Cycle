import axios from "axios";

const Home = () => {
  const getLastRecortd = async () => {
    try {
      const lastrecord = await axios.get(
        "http://localhost:3000/api/user/lastrecord",
        {
          params: {
            user_id: "65689d43582f5a9fb271261e",
          },
        }
      );
      console.log(lastrecord);
    } catch (error) {
      console.log(error);
    }
  };

  getLastRecortd();

  return <div>Home</div>;
};

export default Home;
