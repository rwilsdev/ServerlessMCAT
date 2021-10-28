import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { USER_TOKEN } from '../lib/constants';
import SwrResponse from "../components/swr-response";

export default function Index() {
  const [token, setToken] = useState(Cookies.get('token'))

  useEffect(() => {
    setToken(Cookies.get(USER_TOKEN))
  }, [])

  return (
    <div>
      <h1>JWT Authentication</h1>
      <div>
        <h3>Below is your assigned user token (a JWT), saved under the 
          {USER_TOKEN} cookie
        </h3>
        <pre>
          {token}
        </pre>
      </div>
      <div>
        <h3>Here is the result of making a request to both the edge and the API endpoint:</h3>
        <div>
          <SwrResponse url="/api/hello?edge" />
          <SwrResponse url="/api/hello" />
        </div>
      </div>
    </div>


  )
}
