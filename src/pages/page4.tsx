import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import "github-markdown-css";
import { NavLink } from "react-router-dom";

export const Page4 = () => {
  const [apiName, setApiName] = useState("");

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
    });
    let storedDynamodbName = localStorage.getItem("apiName");
    console.log(storedDynamodbName);
    if (storedDynamodbName == null) {
      localStorage.setItem("apiName", randomName);
      let storedDynamodbName = localStorage.getItem("apiName");
      setApiName(storedDynamodbName!);
    } else {
      setApiName(storedDynamodbName);
    }
  }, []);

  const markdown = `
  # Create routes

  ## Routes 
  
  Routes are a way to send incoming API requests to backend resources. Routes consist of two parts: an HTTP method and a resource path, for example, 'GET /items'. For this example API, we create four routes:
  
  - 'GET /items/{id}'
  - 'GET /items'
  - 'PUT /items'
  - 'DELETE /items/{id}'
  
  ### Create routes:
  
  1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway 
  2. Choose your API ('${apiName}')
  3. On the left panel choose 'Routes'
  4. Choose 'Create'.
  5. For Method, choose 'GET' for the 'GET' route.
  6. For the path, enter '/items/{id}'. The '{id}' at the end of the path is a path parameter that API Gateway retrieves from the request path when a client makes a request.
  7. Choose 'Create'
  8. Repeat steps 5-7 for 'GET /items', 'DELETE /items/{id}', and 'PUT /items'.
  9. Confirm all routes are created.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/5">Next </NavLink>
      <NavLink to="/3">Previous</NavLink>
    </div>
  );
};
