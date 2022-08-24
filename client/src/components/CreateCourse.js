import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Buffer } from "buffer";
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
const change = (event) => {
  const value = event.target.value;
  switch(event.target.name) {
    case"title":
    setTitle(value);
    break;
    case"description":
    setDescription(value);
    break;
    case"estimatedTime":
    setEstimatedTime(value);
    break;
    case"materialsNeeded":
    setMaterialsNeeded(value);
    break;
    default:
      return; 
  }
}

  const submit = () => {
    history.push("/");
    const userId = authUser.id
    console.log(authUser);
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    const emailAddress = authUser.emailAddress ;
    const password = authUser.password;
    context.data.createCourse(course, emailAddress, password)
    .then((res)=> {console.log(res.data)})
    
  }
    //   const body = JSON.stringify(course);
    //   // Creates errors to display on page
    //   let myErrors = [];
    //   if (!title || !description) {
    //     if (!title) {
    //       myErrors.push(['Please provide a value for "Title".']);
    //       setErrors(myErrors);
    //     }
    //     if (!description) {
    //       myErrors.push(['Please provide a value for "Description".']);
    //       setErrors(myErrors);
    //     }
    //   } else {
    //     fetch("http://localhost:5000/api/courses", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "Basic " +
    //           Buffer.from(
    //             `${context.authUser.emailAddress}:${context.authUser.password}`
    //           ).toString("base64"),
    //       },
    //       body: body,
    //     }).then((response) => {
    //       if (response.status === 201) {
    //       } else if (response.status === 400) {
    //         response.json().then((data) => {
    //           return { errors: [data.errors] };
    //         });
    //       } else if (response.status === 500) {
    //         history.push("/error");
    //       } else {
    //         throw new Error();
    //       }
    //     });
    //     history.push('/courses');
    //   }
    // }

    // const change = (event) => {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   if (name === "title") {
    //     setTitle(value);
    //     // console.log(setTitle);
    //   } else if (name === "description") {
    //     setDescription(value);
    //   } else if (name === "estimatedTime") {
    //     setEstimatedTime(value);
    //   } else if (name === "materialsNeeded") {
    //     setMaterialsNeeded(value);
    //   } else {
    //     return;
    //   }
    // };
 
// Jazmin supported with restructuring of this page after failed multiple attempts 
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
                      By {context.authUser.firstName}{" "}
                      {context.authUser.lastName}{" "}
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

    // function cancel() {
    //   history.push("/courses");
    // }

    // function submit() {
    //   const course = {
    //     title,
    //     description,
    //     estimatedTime,
    //     materialsNeeded,
    //     userId: context.authUser.id,
    //   };

    //   const body = JSON.stringify(course);
    //   // Creates errors to display on page
    //   let myErrors = [];
    //   if (!title || !description) {
    //     if (!title) {
    //       myErrors.push(['Please provide a value for "Title".']);
    //       setErrors(myErrors);
    //     }
    //     if (!description) {
    //       myErrors.push(['Please provide a value for "Description".']);
    //       setErrors(myErrors);
    //     }
    //   } else {
    //     fetch("http://localhost:5000/api/courses", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "Basic " +
    //           Buffer.from(
    //             `${context.authUser.emailAddress}:${context.authUser.password}`
    //           ).toString("base64"),
    //       },
    //       body: body,
    //     }).then((response) => {
    //       if (response.status === 201) {
    //       } else if (response.status === 400) {
    //         response.json().then((data) => {
    //           return { errors: [data.errors] };
    //         });
    //       } else if (response.status === 500) {
    //         history.push("/error");
    //       } else {
    //         throw new Error();
    //       }
    //     });
    //     history.push('/courses');
    //   }
    // }

    // function change(event) {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   if (name === "title") {
    //     setTitle(value);
    //   } else if (name === "description") {
    //     setDescription(value);
    //   } else if (name === "estimatedTime") {
    //     setEstimatedTime(value);
    //   } else if (name === "materialsNeeded") {
    //     setMaterialsNeeded(value);
    //   } else {
    //     return;
    //   }
  };

