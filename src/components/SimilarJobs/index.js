import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    title,
    companyLogoUrl,
    jobDescription,
    rating,
    employmentType,
    location,
  } = eachItem
  return (
    <li>
      <div className="similar-jobs-cards">
        <div className="title-cards">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="logo"
          />
          <div>
            <h1 className="text-title"> {title} </h1>
            <div className="star-card">
              <AiFillStar className="star" />
              <p className="rating"> {rating} </p>
            </div>
          </div>
        </div>
        <h1 className="description-heading"> Description </h1>
        <p className="job-para"> {jobDescription} </p>
        <div className="location-ctc-card">
          <div className="star-card">
            <IoLocationSharp className="icon-location" />
            <p className="location-text"> {location} </p>
          </div>
          <div className="star-card">
            <IoBagRemoveSharp className="icon-bag" />
            <p className="employ-text"> {employmentType} </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
