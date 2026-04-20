import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://jobportal-backend-zxh3.onrender.com/api/v1/job/${id}`,
          {
            withCredentials: true,
            timeout: 15000,
          }
        );

        setJob(res.data.job);
      } catch (error) {
        console.log(error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <section className="jobDetail page">
        <div className="container">
          <h2 style={{ textAlign: "center", padding: "40px" }}>
            Loading Job Details...
          </h2>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="jobDetail page">
        <div className="container">
          <h2 style={{ textAlign: "center", padding: "40px" }}>
            Please wait and try again...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>

        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>

          <p>
            Category: <span>{job.category}</span>
          </p>

          <p>
            Country: <span>{job.country}</span>
          </p>

          <p>
            City: <span>{job.city}</span>
          </p>

          <p>
            Location: <span>{job.location}</span>
          </p>

          <p>
            Description: <span>{job.description}</span>
          </p>

          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>

          <p>
            Salary:
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {user && user.role === "Employer" ? null : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;