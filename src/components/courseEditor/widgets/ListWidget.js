import React from "react";
import {findWidgetsForTopic} from "../../../services/WidgetService";

class ListWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        value: this.props.widget.type,
        preview: false,
        text: this.props.widget.text,
        newOrder: 0,
        theOtherWidget: this.props.widget,
        display: this.props.widget.display,
        textItems: []
    };

    changePreview = () => {
        this.setState({
            preview: this.state.preview === false
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.editing !== this.props.editing) {
            this.setState({
                editing: this.props.editing
            })
        }
    }


    deleteWidgetAndChangeOrder = async (widgetId) => {
        let c = this.props.widget.position;
        this.props.deleteWidget(widgetId);
        this.props.widgets.map(widget => widget.position > c? this.props.updateWidget(widget.id, {...widget, position : widget.position - 1}) : widget);
    };
    changePositionUp = (widgetId) => {
        let c = this.props.widget.position;
        let widget = this.props.widget;
        if (widget.position !== 0) {
            this.props.updateWidget(widgetId, {...widget, position : c - 1});
            this.props.widgets.map(widget => widget.position === c - 1 && widget.id !== widgetId? this.props.updateWidget(widget.id, {...widget, position : widget.position + 1}) : widget);
        }
    };
    changePositionDown = async (widgetId) => {
        let as = await findWidgetsForTopic(this.props.topicId);
        let c = this.props.widget.position;
        let widget = this.props.widget;
        if (widget.position !== as.length - 1) {
            this.props.updateWidget(widgetId, {...widget, position : c + 1})
            this.props.widgets.map(widget => widget.position === c + 1 && widget.id !== widgetId? this.props.updateWidget(widget.id, {...widget, position : widget.position - 1}) : widget);
        }
    };

    render () {
        return(
            <div>
                {
                    !this.state.editing && this.state.display === 'Unordered' &&
                    <ul>
                        {this.state.text.split("\n").map(item => (
                            <li key={new Date().getTime() + item}>{item}</li>
                        ))}
                    </ul>
                }
                {
                    !this.state.editing && this.state.display === 'Ordered' &&
                    <ol>
                        {this.state.text.split("\n").map(item => (
                            <li key={new Date().getTime() + item}>{item}</li>
                        ))}
                    </ol>
                }
                {
                    this.state.editing &&
                    <div>
                        <div>
                            {this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-on float-right fa-2x">Preview</i>}
                            {!this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-off float-right fa-2x">Preview</i>}
                            <button onClick={() =>
                            {
                                this.props.saveWidget(this.state.widget.id, {...this.props.widget, text : this.state.text, display: this.state.display})
                            }}
                                    className={"btn btn-success float-right"}>save</button>
                            <br/>
                        </div>
                        <br/>
                        {!this.state.preview &&
                        <div>
                            <div className={"row"}>

                                <div className={"col-8"}>
                                    <h3>List widget</h3>
                                </div>
                                <div className={"col-4 row float-right"}>
                                    <button
                                        onClick={() => this.changePositionUp(this.props.widget.id)}
                                        className={"btn btn-warning btn-sm"}>
                                        <i className="fas fa-arrow-up"/>
                                    </button>

                                    <button
                                        onClick={() => this.changePositionDown(this.props.widget.id)}
                                        className={"btn btn-warning btn-sm"}>
                                        <i className="fas fa-arrow-down"/></button>

                                    <select className={"custom-select col-5"} id={"type"}
                                            onChange={(e) => {
                                                const newType = e.target.value;
                                                this.setState(prevState => {
                                                    prevState.widget.type = newType;
                                                    this.props.updateWidget(this.state.widget.id, {...this.state.widget, display: this.state.display})
                                                    return prevState
                                                })

                                            }}
                                            value={this.state.widget.type}
                                    >
                                        <option value="HEADING">Heading</option>
                                        <option value="PARAGRAPH">Paragraph</option>
                                        <option value="LIST">List</option>
                                        <option value="IMAGE">Image</option>
                                    </select>

                                    <button onClick={() => this.deleteWidgetAndChangeOrder(this.props.widget.id)}
                                        className={"btn btn-danger btn-sm"}>
                                        <i className="fas fa-times"/>
                                    </button>

                                    <br/>
                                </div>
                            </div>

                            <div>
                                <textarea className="form-control"
                                          rows={5}
                                       placeholder={"List text"}
                                       onChange={(e) => {
                                           this.setState({
                                               text: e.target.value
                                           })
                                       }
                                       }
                                       value={this.state.text}
                                       aria-label="Text input with segmented dropdown button"/>
                                <br/>
                                <select className="custom-select" id="inputGroupSelect01"
                                        onChange={(e) => {
                                            const newDisplay = e.target.value;
                                            this.setState(prevState => {
                                                prevState.widget.display = newDisplay;
                                                prevState.display = newDisplay;
                                                return prevState
                                            })
                                        }}
                                        value={this.state.widget.display}>
                                    <option value={"Unordered"}>Unordered list</option>
                                    <option value={"Ordered"}>Ordered list</option>
                                </select>
                                <br/>
                                <br/>
                                <input
                                    type="text" className="form-control"
                                    placeholder={"Widget name"}
                                    aria-label="Text input with segmented dropdown button"

                                    onChange={(e) => {
                                        const newTitle = e.target.value;
                                        this.setState(prevState => {
                                            prevState.widget.title = newTitle;
                                            return prevState
                                        })
                                    }}
                                    value={this.state.widget.title}/>
                            </div>
                        </div>
                        }
                        {this.state.preview &&
                        <div>
                            <hr/>
                            {this.state.display === 'Unordered' &&
                            <ul>
                                {this.state.text.split("\n").map(item => (
                                    <li key={new Date().getTime() + item}>{item}</li>
                                ))}
                            </ul>}
                            {this.state.display === 'Ordered' &&
                            <ol>
                                {this.state.text.split("\n").map(item => (
                                    <li key={new Date().getTime() + item}>{item}</li>
                                ))}
                            </ol>}


                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}
export default ListWidget
