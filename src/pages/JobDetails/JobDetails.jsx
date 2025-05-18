import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const {
    _id,
    title,
    company_logo,
    company,
    salaryRange,
    applicationDeadline,
    description,
    requirements,
    responsibilities,
  } = useLoaderData();

  return (
    <div className="ml-8 my-4">
      <h2 className="text-3xl">job details for {title}</h2>
      <div className="flex gap-2 items-center ">
        <img className="w-8" src={company_logo} alt="companylogo" />
        <p className="text-2xl">{company}</p>
      </div>
      <p>deadline: {applicationDeadline}</p>
      <p className="">description: {description}</p>
      <p className="flex items-center">
        Salary: <FaDollarSign></FaDollarSign> {salaryRange.min} -{" "}
        {salaryRange.max} {salaryRange.currency}
      </p>
      <h2> Requirements:</h2>
      <div className="flex gap-2 flex-wrap my-2">
        {requirements.map((skill, index) => (
          <p
            key={index}
            className="border rounded-md text-center px-2 hover:text-purple-600 hover:bg-gray-400"
          >
            {skill}
          </p>
        ))}
      </div>
      <h2> Responsibilities:</h2>
      <div className="flex flex-col flex-wrap mb-4">
        {responsibilities.map((skill, index) => (
          <p
            key={index}
            className="px-2 hover:text-purple-600 hover:bg-gray-400"
          >
            {index + 1} : {skill}
          </p>
        ))}
      </div>
      <Link to={`/jobApply/${_id}`}>
        <button class="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1.5 px-2.5">
          <span class="w-56 h-48 rounded bg-indigo-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span class="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">
            Apply Now
          </span>
        </button>
      </Link>
    </div>
  );
};

export default JobDetails;
