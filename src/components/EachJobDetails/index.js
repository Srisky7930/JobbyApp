import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import EachCard from '../EachCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class EachJobDetails extends Component {
  state = {
    jobsData: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.job_details
      const jobsData = {
        companyLogoUrl: fetchedData.company_logo_url,
        companyWebsiteUrl: fetchedData.company_website_url,
        employmentType: fetchedData.employment_type,
        id: fetchedData.id,
        jobDescription: fetchedData.job_description,
        lifeAtCompany: fetchedData.life_at_company,
        location: fetchedData.location,
        packagePerAnnum: fetchedData.package_per_annum,
        rating: fetchedData.rating,
        skills: fetchedData.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: fetchedData.title,
      }
      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetails = () => {
    const {jobsData, similarJobs} = this.state
    return (
      <div>
        <EachCard jobsData={jobsData} similarJobs={similarJobs} />
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure view"
        />
      </div>
      <h1> Oops! Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>
    </div>
  )

  renderJobDetailsData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetailsData()}
      </>
    )
  }
}

export default EachJobDetails
