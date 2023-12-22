import PropTypes from "prop-types"
import { Icon } from "@iconify/react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useState } from "react";


const Contact = ({ data }) => {
  const { contactInfo, contactForm } = data;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "fcc74231-656a-425b-a54f-aff38354fadb");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false)
    }
  };
  return (
    <section
      id="contact"
      data-scroll-index={5}
      className="section contact-section"
    >
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-5">
            <SectionHeading title="Let's Work Together" subTitle="Contact" />
            <div className="contact-info">
              <ul>
                {contactInfo.map((element, index) => (
                  <li key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                    <div className="icon">
                      <Icon icon={`bi:${element.icon}`} />
                    </div>
                    <div className="text">
                      <label>{element.title}</label>
                      <p>
                        {element.text}
                        <span>
                          {element.emailLink &&
                            <a
                              className="text-reset"
                              href="mailto:info@domainname.com"
                            >
                              {element.emailLink}
                            </a>
                          }
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
 
            </div>
          </div>

           
              
                <h4>{contactForm.title}</h4>
                <p>{contactForm.text}</p>
              </div>





            
          </div>

      
    </section>
  )
}

Contact.propTypes = {
  data: PropTypes.object
}



export default Contact;
