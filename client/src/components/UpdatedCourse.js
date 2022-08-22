import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import Form from './Form';
import Forbidden from './Forbidden';

export default function UpdatedCourse({context}) {

    const history = useHistory();
    const [course, setCourse] = useState('');
    const [description, setDescription] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if(response.status===200) {
                    const json = await response.json();
                    setCourse(json.course);
                    setDescription(json.description);
                    setUser(json.user);
                } else if (response.status === 500) {
                    history.push('/error');
                } else {
                    history.push('/notfound');
                }
            } catch (err) {
            }
        };
        fetchData();
    }, [history, id]);
    function cancel() {
        history.push('/courses');
    }

    function submit() {
        const updatedCourse = {
            course,
            description,
            materialsNeeded,
            userId: context.auth-user.id,
        };

        const body = JSON.stringify(updatedCourse);
       
        let newErrors = [];
        if(!course || !description) {
            if (!course) {
                newErrors.push(['Provide a valid value for "Course".']);
                setErrors(newErrors);
            }
            if (!description) {
                newErrors.push(['Provide a valid value for "Description".'])
                setErrors(newErrors);
            }
        } else {
            fetch(`http://localhost:5000/api/courses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" ,
                        'Authorization': 'Basic ' + Buffer.from(`${context.auth-user.emailAddress}:${context.auth-user.password}`).toString("base64") 
                },
                body: body,
            })
                .then( response => {
                    if (response.status === 204) {
                        history.push(`/courses/${id}`);
                    } else if (response.status === 400){
                        return response.json().then(data => {
                            return data.errors;
                        });
                    } else {
                        throw new Error();
                    }
                })
        }
    }

    function change(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'courseCourse') {
            setCourse(value);
        }
        else if (name === 'courseDescription') {
            setDescription(value);
        } else if (name === 'materialsNeeded') {
            setMaterialsNeeded(value);
        }
        else {
            return;
        }
    };

    return (
        <main>
            {(user && user.id === context.auth-user.id) ? 
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
                                            <label htmlFor="courseCourse">Course Title</label>
                                                <input 
                                                    id="courseCourse" name="courseCourse" type="text" value={course} 
                                                    onChange={change}
                                                />
                                            {user && 
                                                (<p>
                                                    By {user.firstName} {user.lastName}
                                                </p>
                                            )}
                                            <label htmlFor="courseDescription">Course Description</label>
                                                <textarea id="courseDescription" name="courseDescription" value={description} onChange={change}></textarea>
                                        </div>

                                        <div>
                                            <label htmlFor="materialsNeeded">Materials Needed</label>
                                                <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )} 
                        />
                    </div>
                </React.Fragment>
            :
                <Forbidden />
            }
        </main>
    )};