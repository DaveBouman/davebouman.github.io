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

export const Page1 = () => {
  const [dynamodbName, setDynamodbName] = useState("");

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    let storedDynamodbName = localStorage.getItem("dynamodbName");
    console.log(storedDynamodbName);
    if (storedDynamodbName == null) {
      localStorage.setItem("dynamodbName", randomName);
      let storedDynamodbName = localStorage.getItem("dynamodbName");
      setDynamodbName(storedDynamodbName!);
    } else {
      setDynamodbName(storedDynamodbName);
    }
  }, []);

  const markdown = `
    ## Create a DynamoDB table
    
    [DynamoDB](https://aws.amazon.com/dynamodb/) is a fully managed NoSQL database service that provides fast and predictable performance with 
    seamless scalability. DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database so that you
    don't have to worry about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling.
    
    With Amazon DynamoDB, you can create database tables that can store and retrieve any amount of data and serve any level of request traffic.
    
    You use an Amazon DynamoDB table to store data for your API. Each item has a unique ID, which we use as the partition key for the table.
    
    To create a DynamoDB table:
    
    1. Open the DynamoDB console at 'https://console.aws.amazon.com/dynamodb/'
    2. Choose 'Create table'.
    3. For 'Table name', enter: ${dynamodbName}.
    4. For 'Primary key', enter: 'id'.
    5. Choose 'Create' (see below: 1,2,3) to create the DynamoDB table.
    
    After a few seconds, your DynamoDB table becomes available.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/2">Next </NavLink>
    </div>
  );
};
