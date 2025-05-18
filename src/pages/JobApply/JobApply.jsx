import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(id, user);

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    // console.log(linkedIn, github, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      resume,
    };

    fetch("http://localhost:3000/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Job Apply has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myApplications");
        }
      });
  };

  return (
    <div className="card w-full shadow-2xl">
      <h1 className="text-3xl font-bold text-center">
        Apply Job and Good Luck!
      </h1>
      <form
        onSubmit={submitJobApplication}
        className="card-body ml:2 max-w-full text-center"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn URL"
            className="input input-bordered mx-4"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text  text-black">Github URL</span>
          </label>
          <input
            type="url"
            name="github"
            placeholder="Github URL"
            className="input input-bordered mx-4"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text  text-black">Resume URL</span>
          </label>
          <input
            type="url"
            name="resume"
            placeholder="Resume URL"
            className="input input-bordered mx-4"
            required
          />
        </div>
        <div className="form-control ">
          <button className="btn btn-primary">Apply</button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;
