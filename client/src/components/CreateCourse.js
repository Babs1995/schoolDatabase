// This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route.
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

export default function CreateCourse() {
  let history = useHistory();
  const context = useContext(Context);
  const authUser = context.authUser;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const cancel = () => {
    history.push("/courses");
  };
  // sets the value of  each component of a course
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        return;
    }
  };
// changes can be made as long as authorized user is signed in
  const submit = () => {
    const userId = authUser.id;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    context.data.createCourse(course, emailAddress, password)
      .then(errors => {
        if(errors.length) {
          setErrors(errors)
        } else {
          history.push("/")
        }
    })
    .catch(error => { 
      throw error
    })
  };
  // Jazmin supported with restructuring of this page after multiple adjustments that did not render as the page should 
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={change}
                  />
                  <p>
                    By {context.authUser.firstName} {context.authUser.lastName}{" "}
                  </p>
                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={change}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={change}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded}
                    onChange={change}
                  ></textarea>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </main>
  );
}
