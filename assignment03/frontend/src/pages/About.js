const About = () => {
  return (
    <div className="infoList">
      <h1>About the class</h1>
      <h2>Date: December 10th, 2023</h2>
      <p class="text1">
        This website was created for COM S 319: Construction of User Interfaces.<br/>
        This is "assignment 3", which covers creating a MERN application.<br/>
        Mern stands for MongoDB, Express, React, Node.js. This application uses all of the following.<br/>
        Core CRUD functions of Create, React, Update, Delete can all be used.
      </p>
      <h2>About the students</h2>
      <div>
        <h3>Connor Ferris</h3>
        <p class="text1">
          Connor is a junior studying computer science. He is from Honey Creek, IA.
          You can reach him at connor27@iastate.edu
        </p>
      </div>
      <div>
        <h3>Joseph Jennings</h3>
        <p class="text1">
          Joseph is a senior in computer science. He is from St Louis, MO
          Feel free to email him: jtj9@iastate.edu
        </p>
      </div>
      <div>
        <h3>Dr. Abraham N. Aldaco Gastelum</h3>
        <p class="text1">
          Dr. Aldaco is our professor who is overseeing this course. You can email him ataaldaco@iastate.edu
        </p>
      </div>
    </div>
  );
};

export default About;