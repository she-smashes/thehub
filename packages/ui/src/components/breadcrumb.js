import react,{Component} from 'react';

class BreadCrumb extends Component
{
  render(){
    var breadCrumb = this.props.data.map(function(item)
    {
      return ( <li> <a href={item.Url}> {item.Title} </a> </li>)
    });
    return ( <ul>
      <breadCrumb />
    </ul>);
  }
}

/*const BreadCrumb = () => {
      render(){ this.props.data.map(function(item)
      {
        return ( <li> <a href={item.Url}> {item.Title}</a> </li>)
      });}
};*/
export default BreadCrumb;
