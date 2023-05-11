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

export const Page9 = () => {
  const markdown = `
  ## Clean Up!

To prevent unnecessary costs, delete the resources that you created as part of this getting started exercise. The following steps delete your HTTP API, your Lambda function, and associated resources. If this is an event organized by AWS, you don't need to follow the steps below. The environment will be terminated after the event has concluded.

To delete a DynamoDB table:

1. Open the DynamoDB console at https://console.aws.amazon.com/dynamodb/.
2. Select your table.
3. Choose Delete table.
4. Confirm your choice, and choose Delete.

To delete an HTTP API:

1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway/.
2. On the APIs page, select an API. Choose Actions, and then choose Delete.
3. Choose Delete.

To delete a Lambda function:

1. Sign in to the Lambda console at https://console.aws.amazon.com/lambda/.
2. On the Functions page, select a function. Choose Actions, and then choose Delete.
3. Choose Delete.

To delete a Lambda function's log group:

1. In the Amazon CloudWatch console, open the Log groups page.
2. On the Log groups page, select the function's log group (/aws/lambda/http-crud-tutorial-function). Choose Actions, and then choose Delete log group.
3. Choose Delete.

To delete a Lambda function's execution role:

1. In the AWS Identity and Access Management console, open the Roles page.
2. Select the function's role, for example, http-crud-tutorial-role.
3. Choose Delete role.
4. Choose Yes, delete.

To delete the Cloud9 IDE:

1. Sign in to the Cloud9 console at https://console.aws.amazon.com/cloud9/.
2. In the Your environments page, select an IDE. Choose Delete.
3. To confirm your choice type Delete.
4. Choose Delete.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/8">Previous</NavLink>
    </div>
  );
};
