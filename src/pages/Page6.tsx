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

export const Page6 = () => {
  const [lambdaName, setLambdaName] = useState("");
  const [apiName, setApiName] = useState("");

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    const storedLambdaName = localStorage.getItem("lambdaName");
    console.log(storedLambdaName);
    if (storedLambdaName == null) {
      localStorage.setItem("lambdaName", randomName);
      let storedLambdaName = localStorage.getItem("lambdaName");
      setLambdaName(storedLambdaName!);
    } else {
      setLambdaName(storedLambdaName);
    }

    const randomNameApi = uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
    });
    let storedDynamodbName = localStorage.getItem("apiName");
    console.log(storedDynamodbName);
    if (storedDynamodbName == null) {
      localStorage.setItem("apiName", randomNameApi);
      let storedDynamodbName = localStorage.getItem("apiName");
      setApiName(storedDynamodbName!);
    } else {
      setApiName(storedDynamodbName);
    }
  }, []);

  const markdown = `
  Attach your integration to routes

  HTTP API to DDB
  For this example API, you use the same AWS Lambda integration 
  for all routes, so in essence a monolithic application. Monoliths work well for the simplest serverless applications that perform single-purpose functions. As those applications evolve into workflows or develop new features, it becomes important to refactor the code into smaller services as described in: Best practices for organizing larger serverless applications 
  
  After you attach the integration to all of the API's routes, your Lambda function is invoked when a client calls any of your routes.
  To attach integrations to routes
  
      Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway 
  
  Choose your API (${apiName})
  Choose Integrations
  Choose a route
  Under Choose an existing integration, choose ${lambdaName} choose integration
  
      Choose Attach integration
      Repeat steps 4-6 for all routes. All routes show that an AWS Lambda integration is attached.
  
  The console shows AWS Lambda on all routes to indicate that your integration is attached.
  Now that you have an HTTP API with routes and integrations, you can test your API.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/7">Next </NavLink>
      <NavLink to="/5">Previous</NavLink>
    </div>
  );
};
