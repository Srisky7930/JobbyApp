import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'
import SimilarJobs from '../SimilarJobs'

const EachJobItems = props => {
  const {jobsData, similarJobs} = props
  console.log(jobsData)
  const {
    companyWebsiteUrl,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    lifeAtCompany,
    skills,
  } = jobsData
  const {description} = lifeAtCompany

  return (
    <div>
      <div className="jobs-details-container">
        <li className="jobs-list-cards">
          <div className="company-details-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-card">
              <h1 className="title"> {title} </h1>
              <div className="star-card">
                <AiFillStar className="star" />
                <p className="rating"> {rating} </p>
              </div>
            </div>
          </div>

          <div className="location-details-card">
            <div className="location-card">
              <div className="star-card">
                <IoLocationSharp className="icon" />
                <p className="location-text"> {location} </p>
              </div>
              <div className="star-card">
                <IoBagRemoveSharp className="icon" />
                <p className="employ-text"> {employmentType} </p>
              </div>
            </div>
            <div>
              <p className="package-lpa"> {packagePerAnnum} </p>
            </div>
          </div>
          <hr />

          <div className="visit-container">
            <div>
              <h1 className="description-heading"> Description </h1>
            </div>
            <div>
              <a className="link-item" href={companyWebsiteUrl}>
                Visit
              </a>
            </div>
          </div>

          <div>
            <p className="job-description"> {jobDescription} </p>
          </div>

          <div className="skills-container">
            <h1 className="description-heading"> Skills </h1>
            <ul className="skills-list">
              {skills.map(each => (
                <li className="skills-items" key={each.name}>
                  <img
                    className="skills-image"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skills-name">{each.name} </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-at-company-container">
            <h1 className="description-heading"> Life at company </h1>
            <div className="life-card">
              <p className="life-description"> {description} </p>
              <img
                className="life-at-image"
                src={lifeAtCompany.image_url}
                alt="life at company"
              />
            </div>
          </div>
        </li>
        <h1 className="similar-heading">Similar Jobs</h1>

        <ul className="similar-list">
          {similarJobs.map(each => (
            <SimilarJobs eachItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EachJobItems
