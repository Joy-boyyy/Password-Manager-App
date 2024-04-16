import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

// const dummyData = [
//   {id: 1, web: 'google', user: 'ram', pass: 12345},
//   {id: 2, web: 'Yahoo', user: 'ram', pass: 12345},
//   {id: 3, web: 'DUckDuck', user: 'ram', pass: 12345},
//   {id: 4, web: 'OldGold', user: 'ram', pass: 12345},
// ]

const profileCLr = ['green', 'red', 'Coral', 'Crimson', 'Violet']

class App extends Component {
  state = {
    webSiteName: '',
    userName: '',
    password: '',
    isTrue: false,
    myArr: [],
    searchVar: '',
    filtered: [],
    arrNotFound: true,
  }

  checkBoxFun = event => {
    this.setState({isTrue: event.target.checked})
  }

  didSearch = event => {
    const {myArr} = this.state

    const copiedArr = [...myArr]

    const filteredData = copiedArr.filter(prevFilter =>
      prevFilter.web.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    if (filteredData.length === 0) {
      this.setState({searchVar: event.target.value, arrNotFound: false})
    } else {
      this.setState({
        filtered: filteredData,
        searchVar: event.target.value,
        arrNotFound: true,
      })
    }
  }

  delBtnClicked = ID => {
    const {myArr, filtered} = this.state

    const foundIndex = myArr.findIndex(fIn => fIn.id === ID)

    const foundIndexDelete = filtered.findIndex(fIn => fIn.id === ID)

    myArr.splice(foundIndex, 1)
    filtered.splice(foundIndexDelete, 1)

    this.setState({myArr})
    this.setState({filtered})
  }

  fetchingData = (gotResult, trueOrNot) => (
    <ul className="ulCl">
      {gotResult.map(mapData => (
        <FetchingComponent
          key={mapData.id}
          fullData={mapData}
          randomCLr={profileCLr}
          delBtnClicked={this.delBtnClicked}
          gotTrue={trueOrNot}
        />
      ))}
    </ul>
  )

  notFound = () => (
    <div className="noPass">
      <img
        className="noPassImg"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  getFormFun = () => {
    const {webSiteName, userName, password} = this.state

    return (
      <div className="formsDiv">
        <div className="AddNewPassPara">
          <h1 className="paraAddPass">Add New Password</h1>
        </div>
        <form onSubmit={this.didSubmit}>
          <div className="logoDivInput">
            <img
              className="logoWidth"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              value={webSiteName}
              type="text"
              onChange={this.webSiteNameFun}
              placeholder="Enter Website"
            />
          </div>

          <div className="logoDivInput">
            <img
              className="logoWidth"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="userName"
            />
            <input
              value={userName}
              type="text"
              onChange={this.userNameFun}
              placeholder="Enter Username"
            />
          </div>

          <div className="logoDivInput">
            <img
              className="logoWidth"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              onChange={this.passwordFun}
              type="password"
              value={password}
              placeholder="Enter Password"
            />
          </div>

          <div className="btnDIv">
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </div>
    )
  }

  webSiteNameFun = event => {
    this.setState({webSiteName: event.target.value})
  }

  userNameFun = event => {
    this.setState({userName: event.target.value})
  }

  passwordFun = event => {
    this.setState({password: event.target.value})
  }

  didSubmit = event => {
    event.preventDefault()

    const {webSiteName, userName, password} = this.state

    const objStructure = {
      id: uuid(),
      web: webSiteName,
      user: userName,
      pass: password,
    }

    this.setState(prevData => ({
      myArr: [...prevData.myArr, objStructure],
      webSiteName: '',
      userName: '',
      password: '',
    }))
  }

  gettingFilterDataAndFullData = () => {
    const {filtered, myArr} = this.state

    if (filtered.length !== 0) {
      return filtered
    }
    // return filtered
    return myArr
  }

  render() {
    const {myArr, searchVar, arrNotFound, isTrue} = this.state

    const result = this.gettingFilterDataAndFullData()

    return (
      <div className="mainDiv">
        <div className="mainLogoDiv">
          <img
            className="passManagerLogoImgCl"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>

        <div className="child2Div">
          <div className="formDivParent">{this.getFormFun()}</div>
          <div className="passManagerDiv">
            <img
              className="passManagerCL"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt=" password manager"
            />
          </div>
        </div>

        <div className="child3Div">
          <div className="child3Child">
            <div className="h1CheckBox">
              <div className="h1LenPara">
                <h1 className="h1Password">Your Passwords </h1>
                <p>{myArr.length}</p>
              </div>
              <div className="searchInputDIv">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="logoWidth"
                />
                <input
                  type="search"
                  value={searchVar}
                  className="searchCL"
                  onChange={this.didSearch}
                />
              </div>
            </div>
            <hr />
            <div className="checkLabelCl">
              <input
                type="checkbox"
                id="checkBox"
                onChange={this.checkBoxFun}
              />
              <label htmlFor="checkBox">Show Passwords</label>
            </div>
          </div>

          <div>
            {result.length > 0 && arrNotFound
              ? this.fetchingData(result, isTrue)
              : this.notFound()}
          </div>
        </div>
      </div>
    )
  }
}

export default App

const FetchingComponent = props => {
  const {fullData, randomCLr, delBtnClicked, gotTrue} = props
  const {id, pass, user, web} = fullData
  const randomData = Math.floor(Math.random() * randomCLr.length)

  const passORImg = gotTrue ? (
    pass
  ) : (
    <img
      className="starImg"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const delFun = () => {
    delBtnClicked(id)
  }

  return (
    <li className="liCl">
      <div className="mainContainerForCard">
        <div className={`firstLetter ${randomCLr[randomData]}`}>
          {web.slice(0, 1)}
        </div>
        <div className="detailsContainer">
          <div>
            <p>{web}</p>
          </div>
          <div>
            <p>{user} </p>
          </div>
          <div>
            <p>{passORImg}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="delBtn"
            onClick={delFun}
            data-testid="delete"
          >
            <img
              className="newClForlogoWidth"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
