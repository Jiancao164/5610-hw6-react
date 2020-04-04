import React from "react";
import {Link} from "react-router-dom";
import {deleteCourse, findAllCourses} from "../../services/CourseService";

class CourseRowComponentStateful extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        active: false,
        course: this.props.course,
        courses: [],
        activeId: ''

    };
    editCourse = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    };
    componentDidMount = async () => {

        const courses = await findAllCourses();
        this.setState({
            courses: courses
        })

    }

    activateCourse = (course) => {
        this.setState({
            course: course,
            activeId: course.id
        })
    }

    saveCourse = (course_Id, newCourse) => {
        this.props.saveCourse(course_Id, this.state.course);
        this.setState({
            courses: this.state.courses.map(course => course.id===course_Id? newCourse : course)
        })
    };

    ac = (course) => {
        this.setState(prevState => ({
            courses: prevState.courses.map(c => {
                c.editing = false
                if(c.id === course.id) {
                    c.editing = true
                } else {
                    c.editing = false
                }
                return c
            })}))
    }




    updateForm = (event) => {
        this.setState({
            course: {
                ...this.state.course,
                title: event.target.value
            }
        })
        console.log(this.state.course)
    };

    render() {
        return(
            <ul className="list-group">
                {this.props.courses &&
                this.props.courses.map(course =>
                    <li key={course.id} className={`list-group-item list-group-item-action ${this.state.activeId===course.id?'active':''}`}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                {this.state.activeId!==course.id &&
                                <Link to={`/course-editor/${course.id}`}>
                                    {course.title}
                                </Link>
                                }
                                {this.state.activeId===course.id && <input onChange={this.updateForm} value={this.state.course.title}/>
                                }
                            </div>
                            <div className={"col-3 d-none d-md-block"}>
                                Me
                            </div>
                            <div className={"col-2 d-none d-lg-block"}>
                                01/01/2020
                            </div>
                            <div className={"col-1"}>
                                {this.state.activeId!==course.id &&
                                <div className={"float-right"}>
                                    <i onClick={() => this.activateCourse(course)} className="fas fa-pen"/>
                                    <i onClick={() =>
                                    this.props.deleteCourse(course)}
                                     className="fas fa-trash"/>
                                </div>
                                }
                                {this.state.activeId===course.id &&
                                <div className={"float-right"}>
                                    <i className="fas fa-check float-right"
                                       onClick={() => {this.saveCourse(course.id, this.state.course); this.setState({activeId: ''})}}/>
                                </div>
                                }
                            </div>
                        </div>
                    </li>
                )
                }
            </ul>
            
        )
    }
}

export default CourseRowComponentStateful
