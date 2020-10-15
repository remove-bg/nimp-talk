import NodeImage from '../NodeImage.js';
import RemoveBgProperties from './RemoveBgProperties.jsx';
import OutputImage from '../OutputImage.js';
import InputImage from '../InputImage.js';
import InputString from '../InputString.js';

export default class RemoveBg extends NodeImage {
  constructor(className, graph, x, y, settings) {
    super(className, graph, x, y, 'remove.bg', RemoveBgProperties, settings);

    this.inputs = [
      new InputImage(this, 0, 'Input'),
      new InputString(this, 1, 'API Key', '##########')
    ];
    this.outputs = [
      new OutputImage(this, 0, 'Output')
    ];
  }


  run(inputThatTriggered) {
    if (this.inputs[0].image) {
      this.bg.classList.add('running');
      this.runTimer = Date.now();

      if (this.isInsideALoop) {
        let image = this.inputs[0].image.clone();
        this.processImage(image);
        super.run(inputThatTriggered);
      } else {
        Jimp.read(this.inputs[0].image).then(image => {
          this.processImage(image);
          super.run(inputThatTriggered);
        });
      }
    } else {
      this.runTimer = Date.now();
      this.image = null;
      super.run(inputThatTriggered);
    }
  }
  processImage(image) {
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      if (xhr.status != 200) {
        return console.error(
          'Error:',
          xhr.status,
          String.fromCharCode.apply(null, new Uint8Array(xhr.response))
          //xhr.response.toString('utf8')
        );
      }
      var buffer = Buffer.from(xhr.response, 'base64');
        Jimp.read(buffer)
          .then(image => {
            this.image = image;
          })
          .catch(error => {
            console.log(error);
          });
      
    });
    // open the request with the verb and the url
    xhr.open('POST', 'https://api.remove.bg/v1.0/removebg');

    var formData = new FormData();
    var imageData = image.bitmap.data;
    
    image.getBuffer(Jimp.MIME_JPEG, (err, buff) => { // pass buffer to API
      if (err) {
        return console.error(
          'Error:',
          err
        );
      }

      var blob = new Blob([buff]);
      formData.append('image_file', blob);
      //formData.append('image_url', 'https://i.imgur.com/bray6Ez.jpg');

      formData.append('size', 'auto');

      var api_key = this.inputs[1].string;
      xhr.setRequestHeader('X-Api-Key', api_key);
      // send the request
      xhr.responseType = 'arraybuffer'; // needed for correct response format

      xhr.send(formData);
    });


    
  }


  toJson() {
    let json = super.toJson();

    json.settings.api_key = this.api_key;

    return json;
  }
}
