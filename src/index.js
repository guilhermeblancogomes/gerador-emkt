import React, { Component } from "react";
import ReactDOM from "react-dom";
import EmailEditor from "react-email-editor";
import "./styles.css";
import { saveAs } from "file-saver";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navbar";

const divStyle = {
  width: "95%",
  backgroundColor: "#f5f2f0",
  height: "40% auto",
  padding: 10,
  borderSize: 1,
  borderColor: "#ccc",
  position: "absolute",
  borderRadius: 10,
  marginLeft: 45
};
const labelPreview = {
  fontWeight: "bold",
  margin: 10,
  textAlign: "center"
};
const buttontyle = {
  height: "40",
  padding: 10,
  margin: 10,
  border: "none"
};
const editorHTML = {
  height: 500
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exportHTMl: "",
      titleFile: "",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  exportHtml = () => {
    this.editor.exportHtml(data => {
      var blob = new Blob([data.html], { type: "text/html;charset=utf-8" });
      saveAs(blob, `${this.state.titleFile}.html`);
    });
    this.setState({
      modal: false
    });
  };
  previewHtml = () => {
    this.editor.exportHtml(data => {
      const { html } = data;
      this.setState({
        exportHTML: html
      });
    });
  };
  handleChange = event => {
    this.setState({ titleFile: event.target.value });
  };
  render() {
    console.log(this.state.titleFile);
    return (
      <div>
        {/* INICIO DO MODAL */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Qual o nome do seu arquivo?
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Nome do Arquivo
              </InputGroupAddon>
              <Input
                value={this.state.titleFile}
                onChange={this.handleChange}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.exportHtml}>
              Baixar
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        {/* FINAL  DO MODAL */}
        <NavBar />
        <div>
          <EmailEditor
            ref={editor => (this.editor = editor)}
            style={editorHTML}
          />
        </div>
        <div>
          <Button color="success" style={buttontyle} onClick={this.toggle}>
            Baixar HTML
          </Button>
          <Button color="primary" style={buttontyle} onClick={this.previewHtml}>
            Preview
          </Button>
        </div>
        <div style={divStyle}>
          <div style={labelPreview}>Preview do HTML</div>
          <div>{this.state.exportHTML}</div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
