import React from "react";
import {connect} from "react-redux";
import {createTopic, deleteTopic, findTopicsForLesson, updateTopic} from "../../services/TopicService";
import {
    createTopicAction,
    deleteTopicAction,
    findTopicsForLessonAction,
    updateTopicAction
} from "../../actions/topicActions";
import TopicPillItem from "./TopicPillItem";


class TopicPill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTopicId: this.props.topicId,
            editingTopicId: ''
        }
    }
    componentDidMount() {
        this.props.findTopicsForLesson(this.props.lessonId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.lessonId !== prevProps.lessonId) {
            this.props.findTopicsForLesson(this.props.lessonId)
        }
    }

    edit = (topic) => {
        const topicId = topic.id;
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${this.props.moduleId}/lessons/${this.props.lessonId}/topics/${topic.tid}`);
        this.setState({
            editingTopicId: topic.id
        })
    };

    select = (topic) =>  {
        const topicId = topic.id;
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${this.props.moduleId}/lessons/${this.props.lessonId}/topics/${topic.id}`);
        this.setState({
            activeTopicId: topic.id
        })
    };

    save = () => {
        this.setState({
            editingTopicId: ''
        })
    };

    render() {
        return(
            <ul className="nav nav-pills">
                {
                    this.props.topics && this.props.topics.map(topic =>
                        <TopicPillItem
                            key={topic.id}
                            edit={this.edit}
                            select={this.select}
                            save={this.save}
                            updateTopic={this.props.updateTopic}
                            deleteTopic={this.props.deleteTopic}
                            editing={topic.id === this.state.editingTopicId}
                            active={topic.id === this.state.activeTopicId}
                            topic={topic}/>)
                }
                <li className="nav-item">
                    <i className={"fas fa-plus"} onClick={() => this.props.createTopic(this.props.lessonId, {tid: (new Date().getMinutes() * 1000 + new Date().getMilliseconds()) + "", title: 'New Topic'})}/>
                </li>
            </ul>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    topics: state.topics.topics
});

const dispatchToPropertyMapper = (dispatch) => ({
    createTopic: (lessonId, topic) =>
        createTopic(lessonId, topic)
            .then(actualTopic =>
                dispatch(createTopicAction(actualTopic))),
    findTopicsForLesson: (lessonId) =>
        findTopicsForLesson(lessonId)
            .then(topics =>
                dispatch(findTopicsForLessonAction(topics))),
    updateTopic: (topicId, topic) => {
        updateTopic(topicId, topic)
            .then(actualTopic =>
                dispatch(updateTopicAction(actualTopic)))
    },
    deleteTopic: (topicId) => {
        deleteTopic(topicId)
            .then(status =>
                dispatch(deleteTopicAction(topicId)))
    }
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(TopicPill)

