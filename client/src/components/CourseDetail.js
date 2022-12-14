// This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { Context } from '../Context';
import { Buffer } from "buffer";

export default function CourseDetail() {

    let history = useHistory();
    const context = useContext(Context);
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    
    // Fetches course information for this id.
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if(response.status === 200) {
                    const json = await response.json();
                    setCourse(json);
                } else if (response.status === 500) {
                    history.push('/error');
                } else {
                    history.push('/notfound');
                }
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, [id, history]);

    //** Renders the HTML **/
    return ( 
            <main>
            {/* Update the "Sign Up", "Create Course", and "Update Course" screens to display validation errors returned from the REST API. */}
                <div className="actions--bar">
                    <div className="wrap">
                    {context.authUser && context.authUser.id === course.User?.id ? (
                              
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <button className="button" to='/courses/' onClick={deleteACourse}>Delete Course</button>
                                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                                </React.Fragment>
                         ) : (
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        
                      ) }
                    </div>
                </div>
            {/* Displays the information about the course. */}
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                {course.User && 
                                    (<p>
                                        By {course.User.firstName} {course.User.lastName}
                                    </p>
                                )}
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ReactMarkdown className='course--detail--list'>{course.materialsNeeded}</ReactMarkdown>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
    );

    //**  HELPER FUNCTION **// 
    // Deletes a course when the button is pressed IF 
    // the user is authenticated and the owner of the course.
    function deleteACourse() {
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json",
                'Authorization': 'Basic ' + Buffer.from(
                    `${context.authUser.emailAddress}:${context.authUser.password}`
                  ).toString("base64") },
            body: null,  
        })
        .then( response => {
            if (response.status === 204) {
                history.push("/")
            } else if (response.status === 400){
                response.json().then(data => {
                    return data.errors;
                });
            } else {
                throw new Error();
            }
        })
    }
}