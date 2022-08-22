import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { Buffer } from "buffer";

export default function CourseDetail( {context}) {

    let history = useHistory();
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    const authUser = context.authUser;
    
    // Fetches course information for this id.
    useEffect(() => {
        function fetchData() {
            fetch(`http://localhost:5000/api/courses/${id}`)
            .then ((response) => response.json())
            .then ((data) => setCourse(data.courses))
            .catch(err => console.log('Oh no! Error. Beep. Beep.', err))
        }
            fetchData();
        });


    // Deletes course when the button is pressed and user and course owner is authenticated.
    function deleteCourse() {
        fetch(`http://localhost:5000/api/courses/${id}`, { 
            method: 'DELETE',
            headers: {
                'Authorization':
                    "Basic " + Buffer.from(`${authUser.emailAddress}:${authUser.password}`).toString("/base64"),
                "Content-Type": "application/json"
            },
                body: null,
            }
            )
            .then(res => res.json())
            .then(history.push("/"))
            .catch(err => console.log(err))
        } 
        deleteCourse();    
    return ( 
            <main>
            {/* Displays Update, Delete and Return to List buttons if user is authenticated
            and user is owner of course. Only displays Return to List button if the previous 
            conditions don't apply. */}
                <div className="actions--bar">
                    <div className="wrap">
                        {(context.authUser && course.user) ?
                            (context.authUSer.id===course.user.id) ?
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${id}/updated`}>Update Course</Link>
                                    <Link className="button" to='/courses/' onClick={deleteCourse}>Delete Course</Link>
                                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                                </React.Fragment>
                            : 
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        :
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                        }
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
                                {course.user && 
                                    (<p>
                                        By {course.user.firstName} {course.user.lastName}
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
)}