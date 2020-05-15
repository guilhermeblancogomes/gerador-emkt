import React from "react";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

const NavBarBackground = {
  backgroundColor: "#1ac"
};
const logoNextel = {
  color: "#fff",
  fontSize: 20
};
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar style={NavBarBackground} light expand="md">
          <NavbarBrand href="/" style={logoNextel}>
            Gerador de Email Marketing
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </Navbar>
      </div>
    );
  }
}
