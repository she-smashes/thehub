import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from 'react-rte';
import autobind from 'class-autobind';
import {EditorValue} from 'react-rte';

class SimpleRichTextEditor extends Component {

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      editorValue: createEmptyValue(),
      parsedValue: ''
    };
  }

  componentWillMount() {
    this._updateStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this._updateStateFromProps(newProps);
  }

  _updateStateFromProps(newProps) {
    let {value, format} = newProps;
    if (this._currentValue != null) {
      let [currentValue, currentFormat] = this._currentValue;
      if (format === currentFormat && value === currentValue) {
        return;
      }
    }
    let {editorValue} = this.state;
    this.setState({
      editorValue: editorValue.setContentFromString(value, format),
    });
    this._currentValue = [format, value];
  }

  render() {
    let {value, format, onChange, ...otherProps} = this.props; // eslint-disable-line no-unused-vars
    
    return (
      <div class="SimpleRichTextEditor">
        <RichTextEditor
          {...otherProps}
          value={this.state.editorValue}
          onChange={this._onChange}
        />
        <textarea
        id="hidden-editor"
            className="hidden-source"
            value={this.state.parsedValue}
            style={{"display":"none"}}
            onChange={this.props.onParsedValueChange}
        />


      </div>
    );
  }

  _onChange(editorValue) {
    let {format, onChange} = this.props;
    let oldEditorValue = this.state.editorValue;
    this.setState({editorValue});
    let oldContentState = oldEditorValue ? oldEditorValue.getEditorState().getCurrentContent() : null;
    let newContentState = editorValue.getEditorState().getCurrentContent();
    if (oldContentState !== newContentState) {
      let stringValue = editorValue.toString(format);
      // Optimization so if we receive new props we don't need
      // to parse anything unnecessarily.
      this._currentValue = [format, stringValue];
      this.setState({
        parsedValue: this._currentValue[1],
      });
      if (onChange && stringValue !== this.props.value) {
        onChange(stringValue);
      }
    }
  }
}
export default SimpleRichTextEditor;
