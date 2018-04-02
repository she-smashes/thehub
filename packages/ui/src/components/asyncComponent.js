/**
 * @suthor Shalini Jha
 * @component asyncComponent
 * @desc Renders a component aynchronously on demand
 * @param {Component} Component Object
 */
import React, {Component} from 'react';
import Loader from './loader'

export default function asyncComponent(importComponent) {
  
  class AsyncComponent extends Component {
    
    constructor(props) {
      super(props);
      
      this.state = {
        component: null,
      };
    }
    
    /**
     * @desc renders the passed component
     * @returns {Promise.<void>}
     */
    
    async componentDidMount() {
      const {default: component} = await importComponent();
      
      this.setState({
        component: component
      });
    }
    
    render() {
      const C = this.state.component;
      
      return C
        ? <C {...this.props} />
        : <Loader />;
    }
    
  }
  
  return AsyncComponent;
}