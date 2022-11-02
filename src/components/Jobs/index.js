import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: '',
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    employmentTypeFilterList: [],
    activeSalaryRange: '',
    searchInput: '',
    tempSearchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {
      employmentTypeFilterList,
      activeSalaryRange,
      searchInput,
    } = this.state

    const employmentTypeFilterString = employmentTypeFilterList.join(',')
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeFilterString}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(obj => ({
        companyLogoUrl: obj.company_logo_url,
        employmentType: obj.employment_type,
        id: obj.id,
        jobDescription: obj.job_description,
        location: obj.location,
        packagePerAnnum: obj.package_per_annum,
        rating: obj.rating,
        title: obj.title,
      }))
      this.setState({
        jobsList: formattedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  changeSalaryRange = id => {
    this.setState({activeSalaryRange: id}, this.getJobsList)
  }

  addEmploymentTypeFilter = id => {
    const {employmentTypeFilterList} = this.state
    this.setState(
      {employmentTypeFilterList: [...employmentTypeFilterList, id]},
      this.getJobsList,
    )
  }

  removeEmploymentTypeFilter = id => {
    this.setState(
      prevState => ({
        employmentTypeFilterList: prevState.employmentTypeFilterList.filter(
          employmentType => employmentType !== id,
        ),
      }),
      this.getJobsList,
    )
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobsList)
    }
  }

  onChangeSearchInput = event => {
    this.setState({tempSearchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.setState(
      prevState => ({searchInput: prevState.tempSearchInput}),
      this.getJobsList,
    )
  }

  retryProfileApi = () => {
    this.getProfileData()
  }

  retryJobsApi = () => {
    this.getJobsList()
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-success-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-des">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.retryProfileApi}
      >
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoading()
      default:
        return null
    }
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-des">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobsList.map(job => (
          <JobCard job={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryJobsApi}
      >
        Retry
      </button>
    </div>
  )

  renderJobsLoading = () => (
    <div className="job-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoading()
      default:
        return null
    }
  }

  render() {
    const {tempSearchInput} = this.setState
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-content-container">
            <div className="profile-filters-container">
              <div className="sm-search-container">
                <input
                  type="search"
                  className="lg-search-bar"
                  value={tempSearchInput}
                  placeholder="Search"
                  onKeyDown={this.onKeyDownSearchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderProfile()}
              <hr className="hr-line" />
              <h1 className="filter-heading">Type of Employment</h1>
              {employmentTypesList.map(employmentType => (
                <EmploymentType
                  employmentType={employmentType}
                  key={employmentType.employmentTypeId}
                  addEmploymentTypeFilter={this.addEmploymentTypeFilter}
                  removeEmploymentTypeFilter={this.removeEmploymentTypeFilter}
                />
              ))}
              <hr className="hr-line" />
              <h1 className="filter-heading">Salary Range</h1>
              {salaryRangesList.map(salaryRange => (
                <SalaryRange
                  salaryRange={salaryRange}
                  key={salaryRange.salaryRangeId}
                  changeSalaryRange={this.changeSalaryRange}
                />
              ))}
            </div>
            <div className="jobs-container">
              <div className="lg-search-container">
                <input
                  type="search"
                  className="lg-search-bar"
                  value={tempSearchInput}
                  placeholder="Search"
                  onKeyDown={this.onKeyDownSearchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
