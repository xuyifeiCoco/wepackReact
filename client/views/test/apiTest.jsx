import React from 'react'
import axios from 'axios'

class TestApi extends React.Component {
  constructor() {
    super()
    this.getTopics = this.getTopics.bind(this)
  }

  getTopics() {
    axios.get('/api/topics').then((res) => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  toLogin() {
    axios.post('/api/user/login',{
      accessToken: '122ec43d-8485-4166-a254-c12a8d143435',
    }).then((res) => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true',{

    }).then((res) => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.getTopics}>topics</button>
        <button type="button" onClick={this.toLogin}>login</button>
        <button type="button" onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
export default TestApi
