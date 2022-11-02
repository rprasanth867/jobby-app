import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {job} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-logo-title-container">
          <img
            className="job-company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <AiFillStar className="star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
          <div className="job-location-type-container">
            <div className="job-location-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-location-container">
              <BsBriefcaseFill className="location-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="job-des-heading">Description</h1>
        <p className="job-des">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
