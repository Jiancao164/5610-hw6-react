import React from "react";

class ImageWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        value: this.props.widget.type,
        preview: false,
        image: this.props.widget.src
    };

    showImage = (url) => {
        this.setState({
            image: url
        })
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

    render () {
        return(
            <div>
                {
                    !this.state.editing &&

                    <div>
                        {<h3>{this.props.widget.title}</h3>}
                    </div>
                }
                {
                    this.state.editing &&
                    <div>
                        <div>
                            {this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-on float-right fa-2x">Preview</i>}
                            {!this.state.preview && <i
                                onClick={() => {this.changePreview();
                                    this.showImage(this.state.image)
                                }}
                                className="fas fa-toggle-off float-right fa-2x">Preview</i>}
                            <button onClick={() =>
                            {
                                this.props.saveWidget(this.state.widget.id, this.state.widget)
                            }}
                                    className={"float-right"}>save</button>
                            <br/>
                        </div>
                        <br/>
                        {!this.state.preview &&
                        <div>
                            <div className={"row"}>
                                <div className={"col-9"}>
                                    <h3>Image widget</h3>
                                </div>
                                <div className={"col-3 row float-right"}>
                                    <button><i className="fas fa-arrow-up"/></button>
                                    <button><i className="fas fa-arrow-down"/></button>
                                    {console.log(this.state.widget)}
                                    <select id={"type"}
                                            onChange={(e) => {
                                                const newType = e.target.value;
                                                this.setState(prevState => {
                                                    prevState.widget.type = newType;
                                                    this.props.updateWidget(this.state.widget.id, this.state.widget)
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
                                    <i onClick={() => this.props.deleteWidget(this.props.widget.id)} className="fas fa-window-close fa-3x"/>
                                    <br/>
                                </div>
                            </div>

                            <div>
                                <input
                                    type={"text"}
                                    className="form-control "
                                    placeholder={"Image text"}
                                    aria-label="Text input with segmented dropdown button"
                                    onChange={(e) => {
                                        const newSrc = e.target.value;
                                        this.setState(prevState => {
                                        prevState.widget.src = newSrc;
                                        return prevState
                                        })
                                        }
                                    }
                                    value={this.state.widget.src}
                                />
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
                            <h3>Preview</h3>
                            <img src = {this.state.widget.src} />
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ImageWidget
