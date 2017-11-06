import react,{Component} from 'react';

class BreadCrumb extends Component
{
  renderBreadCrumb = () => {
    console.log(this.props);
    return this.props.data.map((item, index) => {
        return (<li> <a href={item.Url}> {item.Title} </a> </li>);
    })
  }
 render = () => {
    return (<ul>
      this.renderBreadCrumb();
    </ul>);
  }
}
export default BreadCrumb;
