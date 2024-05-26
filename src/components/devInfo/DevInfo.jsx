/* eslint-disable react/no-unescaped-entities */
import { Box, Container, Grid } from "@mui/material";
import "./devInfo.css";

const DevInfo = () => {
  return (
    <div className="common_bg">
      <Container>
        <h2 className="heading_title">Dev Info</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="my_info">
              <h4 className="my_name">I'm Raju Molla</h4>
              <h5>
                A Lead <span>MERN Stack Developer</span>
              </h5>
              <p>
                As a seasoned MERN stack developer with over 2 years of
                experience, I specialize in building and maintaining responsive
                web applications. I have extensive expertise in creating dynamic
                and user-friendly web pages using HTML5, CSS3, and JavaScript,
                ensuring cross-browser compatibility and optimal performance. My
                proficiency in React.js allows me to develop interactive and
                efficient front-end interfaces, leveraging hooks, state
                management, and routing.
              </p>
              <hr style={{ margin: "5px 0" }} />
              <h4 className="info_title">PERSONAL INFO</h4>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className="personal_info">
                    <p>
                      <strong>Name : Md. Raju Molla</strong>
                    </p>
                    <p>
                      <strong>Age : 24 Years</strong>
                    </p>
                    <p>
                      <strong>Nationality : Khulna, Bangladesh</strong>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className="personal_info">
                    <p>
                      <strong>Address : Khulna, Dighalia</strong>
                    </p>
                    <p>
                      <strong>Phone : +8801967582421</strong>
                    </p>
                    <p>
                      <strong>Email : mraju5797@gmail.com</strong>
                    </p>
                  </div>
                </Grid>
              </Grid>
              <h4 className="info_title">Education</h4>
              <p>
                <strong>
                  2014 || SSC in Dighalia M.A Majid Model Secondary School
                </strong>
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="my_info">
              <h4 className="info_title">Experience</h4>
              <p>Junior MERN Stack Developer 21/02/2022 to Present</p>
              <h4 className="info_title">ActInovate Group</h4>
              <ul className="ul">
                <li>
                  <strong>
                    Collaborated with UX/UI designers to create intuitive user
                    interfaces.
                  </strong>
                </li>
                <li>
                  <strong>
                    Resolved complex technical issues, reducing the bug count by
                    moderate scale over a 6-month period.
                  </strong>
                </li>
                <strong>
                  <li>
                    Actively participated in code reviews, ensuring best
                    practices and coding standards were maintained.
                  </li>
                </strong>
                <strong>
                  <li>
                    Contributed to the development of a new feature that
                    increased user engagement.
                  </li>
                </strong>
              </ul>
              <hr className="hr" />
              <h4 className="info_title">Technology</h4>
              <h5>Expertise</h5>
              <p>
                <strong>
                  HTML5, CSS3, JavaScript, ES6, ReactJS, React-Bootstrap,
                  Wordpress, Stripe, NextJs, Tailwind, TypeScript
                </strong>
              </p>
              <h5>Tools</h5>
              <p>
                <strong>
                  Git, VS Code, Chrome Dev Tools, Render, Firebase, Azure,
                  Docker.
                </strong>
              </p>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DevInfo;
