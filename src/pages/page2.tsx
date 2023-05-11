import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const Page2 = () => {
  const [lambdaName, setLambdaName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [dynamodbName, setDynamodbName] = useState("");

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

    const randomNameRole = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    const storedRoleName = localStorage.getItem("roleName");
    console.log(storedRoleName);
    if (storedRoleName == null) {
      localStorage.setItem("roleName", randomNameRole);
      let storedRoleName = localStorage.getItem("roleName");
      setRoleName(storedRoleName!);
    } else {
      setRoleName(storedRoleName);
    }

    const randomNameDynamoDB = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    let storedDynamodbName = localStorage.getItem("dynamodbName");
    console.log(storedDynamodbName);
    if (storedDynamodbName == null) {
      localStorage.setItem("dynamodbName", randomNameDynamoDB);
      let storedDynamodbName = localStorage.getItem("dynamodbName");
      setDynamodbName(storedDynamodbName!);
    } else {
      setDynamodbName(storedDynamodbName);
    }
  }, []);
  const markdown = `
  ## Create a lambda function

  Lambda to DynamoDB
  
  **AWS Lambda** is a compute service that lets you run code without provisioning or managing servers. Lambda runs your code only when needed and scales automatically, from a few requests per day to thousands per second. You create a Lambda function for the backend of your API.
  
  This Lambda function creates, reads, updates, and deletes (CRUD) items from DynamoDB. The function uses events from API Gateway to determine how to interact with DynamoDB.
  
  For simplicity this tutorial uses a single Lambda function. As a best practice, you should create separate functions for each route.
  
  ### Create a Lambda function:
  
  1. Sign in to the Lambda console at https://console.aws.amazon.com/lambda 
  2. Choose Create function
  3. Select Author from scratch
  4. For Function name, enter ${lambdaName}
  5. Under Runtime info select Node.js 14.x
  6. Under Permissions choose Change default execution role
  7. Select Create a new role from AWS policy templates
  8. For Role name, enter ${roleName}
  9. For Policy templates, choose Simple microservice permissions. This policy grants the Lambda function permission to interact with DynamoDB.
  
  This workshop uses a managed policy for simplicity. As a best practice, you should create your own IAM policy to grant the minimum permissions required.
  
  **lambda basic information**
  
  10. Choose Create function
  11. Scroll down to the console's Code source editor
  12. Open 'index.js', and replace its contents with the following code.
  
  ~~~
  const AWS = require("aws-sdk");
  
  const dynamo = new AWS.DynamoDB.DocumentClient();
  
  exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
      "Content-Type": "application/json"
    };
  
    try {
      switch (event.routeKey) {
        case "DELETE /items/{id}":
          await dynamo
            .delete({
              TableName: "http-crud-tutorial-items",
              Key: {
                id: event.pathParameters.id
              }
            })
            .promise();
          body = 'Deleted item \${event.pathParameters.id}';
          break;
        case "GET /items/{id}":
          body = await dynamo
            .get({
              TableName: "http-crud-tutorial-items",
              Key: {
                id: event.pathParameters.id
              }
            })
            .promise();
          break;
        case "GET /items":
          body = await dynamo.scan({ TableName: ${dynamodbName} }).promise();
          break;
        case "PUT /items":
          let requestJSON = JSON.parse(event.body);
          await dynamo
            .put({
              TableName: "http-crud-tutorial-items",
              Item: {
                id: requestJSON.id,
                price: requestJSON.price,
                name: requestJSON.name
              }
            })
            .promise();
          body = 'Put item \${requestJSON.id}';
          break;
        default:
          throw new Error('Unsupported route: "\${event.routeKey}"');
      }
    } catch (err) {
      statusCode = 400;
      body = err.message;
    } finally {
      body = JSON.stringify(body);
    }
  
    return {
      statusCode,
      body,
      headers
    };
  };
  ~~~
  
  13. Choose Deploy to update your function.`;

  return <ReactMarkdown children={markdown}></ReactMarkdown>;
};
