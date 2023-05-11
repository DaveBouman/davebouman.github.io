import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import "github-markdown-css";
import { Link, NavLink } from "react-router-dom";

export const Page3 = () => {
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
  # Create an HTTP API

  'HTTP API gateway'
  'Amazon API Gateway'
  
  is a fully managed service that makes it easy for developers to publish, maintain, monitor, secure, and operate APIs at any scale.
  
  With API Gateway, you can create RESTful APIs using either HTTP APIs or REST APIs. Together with AWS Lambda, API Gateway forms the app-facing part of the AWS serverless infrastructure.
  
  HTTP APIs enable you to create RESTful APIs with lower latency and lower cost than REST APIs. You can use HTTP APIs to send requests to AWS Lambda functions or to any publicly routable HTTP endpoint.
  
  The HTTP API provides an HTTP endpoint for your Lambda function. In this step, you create an empty API. In the following steps, you configure routes and integrations to connect your API and your Lambda function.
  
  Create an HTTP API:
  
  1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway
  2. Choose 'Create API' (If you see a welcome screen skip this step and go to step 3)
  3. For 'HTTP API' choose 'Build HTTP API'
  4. For 'API name', enter ${apiName}
  5. Choose 'Next'.
  6. For 'Configure routes', choose 'Next' to skip route creation. You create routes later.
  7. Review the stage that API Gateway creates for you ('$default'), and then choose 'Next'.
  8. Choose 'Create'.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/4">Next </NavLink>
      <NavLink to="/2">Previous</NavLink>
    </div>
  );
};
