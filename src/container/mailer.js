import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';

 class Mailer extends Component {
    constructor(){
        super()
    this.state = {  }
    }

    

    sendMail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_qcsxlni','template_kwwa9q6', e.target,'user_PtZJnDWb4Gp7tfEObDWYT')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
    }

    
    render() {
        return (
            <div className="container pt-4 pb-4" onSubmit ={ this.sendMail }>
                <form className="row">
                    <div className="form-group">
                        <label>From Name</label>
                        <input type="text" className="form-control col-md-6" name="from_name" />
                    </div>
                    <div className="form-group">
                        <label>To Name</label>
                        <input type="text" className="form-control col-md-6" name="to_name" />
                    </div>
                    <div className="form-group">
                        <label>Mail To</label>
                        <input type="text" className="form-control col-md-6" name="to_mail" />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" className="form-control col-md-6" name="subject" />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea type="text" className="form-control col-md-6" name="message"></textarea>
                    </div>
                    <button className="btn btn-sm btn-success col-md-6" style={{'marginTop':'20px'}} type="submit">Send Mail</button>
                </form>
            </div>
        )
    }
}

export default Mailer
