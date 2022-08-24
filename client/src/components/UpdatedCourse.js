// This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses.
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import Form from "./Form";
// import Forbidden from "./Forbidden";

export default function UpdatedCourse({ context }) {
  const history = useHistory();
  const [course, setCourse] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [errors] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  // create a state for this and set the value when the data comes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.status === 200) {
          const json = await response.json();
          setCourse(json.course);
          setTitle(json.title)
          setDescription(json.description);
          setMaterialsNeeded(json.materialsNeeded)
          setEstimatedTime(json.estimatedTime);
          setUser(json.User);
        } else if (response.status === 500) {
          history.push("/error");
        } else {
          history.push("/notfound");
        }
      } catch (err) {}
    };
    fetchData();
  }, [history, id]);
  function cancel() {
    history.push("/courses");
  }

  function submit() {
    const updatedCourse = {
      course,
      title,
      description,
      materialsNeeded,
      
      userId: context.authUser.id,
    };

    const body = JSON.stringify(updatedCourse);
  
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authUser.emailAddress}:${
              context.authUser.password
            }`
          ).toString("base64"),
      },
      body: body,
    }).then((response) => {
      if (response.status === 204) {
        history.push(`/courses`);
      } else if (response.status === 400) {
        return response.json().then((data) => {
          return data.errors;
        });
      } else {
        throw new Error();
      }
    });
  }


  function change(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "courseTitle") {
      // setCourse(value);
      setTitle(value)
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else {
      return;
    }
      return (
    <main>
      {/* {user && user.id === context.authUser.id ? ( */}
        <React.Fragment>
          <div className="wrap">
            <h2>Update Course</h2>
            <Form
              cancel={cancel}
              errors={errors}
              submit={submit}
              submitButtonText="Update Course"
              elements={() => (
                <React.Fragment>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input
                        id="courseTitle"
                        name="courseTitle"
                        type="text"
                        value={title}
                        onChange={change}
                      />
                      {/* {user && ( */}
                        <p>
                        By {user.firstName} 
                        </p>
                      {/* )} */}
                      <label htmlFor="courseDescription">
                        Course Description
                      </label>
                      <textarea
                        id="courseDescription"
                        name="courseDescription"
                        value={description}
                        onChange={change}
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        value={materialsNeeded}
                        onChange={change}
                      ></textarea>
                    </div>
                  </div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={change}
                  />
                </React.Fragment>
              )
              }
            />
          </div>
        </React.Fragment>
    </main>
  );
}
}
