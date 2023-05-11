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

export const Page5 = () => {
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
  To attach integrations to routes:

1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway
2. Choose your API (${apiName})
3. Choose Integrations
4. Choose a route
5. Under Choose an existing integration, choose ${lambdaName}
6. Choose Attach integration
7. Repeat steps 4-6 for all routes. All routes show that an AWS Lambda integration is attached.

The console shows AWS Lambda on all routes to indicate that your integration is attached. Now that you have an HTTP API with routes and integrations, you can test your API.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/6">Next </NavLink>
      <NavLink to="/4">Previous</NavLink>
    </div>
  );
};
