import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4 text-primary" style={{ fontSize: '32px' }}>
        What Our Students Say
      </h2>
      <div className="row justify-content-center g-4">
        {testimonialsData.map((testimonial) => (
          <div className="col-md-6 col-lg-3" key={testimonial.id}>
            <div className="card shadow-sm border-0 rounded-3 text-center p-3">
              <img
                src={testimonial.image}
                className="card-img-top rounded-circle mx-auto mb-3"
                alt={testimonial.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <p className="card-text" style={{ fontSize: '16px', color: '#333' }}>
                  {testimonial.message}
                </p>
                <div className="text-center mt-auto">
                  <h5 className="card-title mb-1" style={{ fontSize: '18px', fontWeight: 'bold', color: '#8a4baf' }}>
                    {testimonial.name}
                  </h5>
                  <p className="card-subtitle text-muted" style={{ fontSize: '14px' }}>
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
