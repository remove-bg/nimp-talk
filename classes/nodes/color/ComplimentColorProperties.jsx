import Properties from '../Properties.js';

export default class ComplimentColorProperties extends Properties {

  constructor(props) {
    super(props);
  }


  stringChange(event) {
    const elm = document.getElementById('stringInput');
    this.props.node.string = elm.value;
    this.props.node.run(null);
  }


  render() {
    return (
      <div>
        <div className="propertiesTitle">Compliment Color</div>

        <div style={{padding:'10px'}}>
          {this.renderName()}
          {this.renderRun()}
        </div>
      </div>
    )
  }
}
