import Properties from '../Properties.js';

export default class RemoveBgProperties extends Properties {

  render() {
    return (
      <div>
        <div className="propertiesTitle">remove.bg</div>
        <div style={{padding:'10px'}}>
          by kaleido.ai<br/>
          {this.renderRun()}
        </div>
      </div>
    )
  }
}
