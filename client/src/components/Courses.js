// This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. 
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

export default function Courses() {
  const context = useContext(Context);
  const [data, setData] = useState([]);
  let courses;
// the effect of get courses runs getting from context 
  useEffect(() => {
    context.data
      .getCourses()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        throw error;
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
// gives a list of the courses and titles 
  if (data.length) {
    courses = data.map((course, index) => (
      <Link
        className="course--module course--link"
        key={index}
        to={`/courses/${course.id}`}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    ));
  }
// button allows for creation of a course in html 
  return (
    <main>
      <div className="wrap main--grid">
        {courses}
        {/* Button to create a course. */}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
}
