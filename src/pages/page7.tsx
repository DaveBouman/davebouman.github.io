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

export const Page7 = () => {
  const [cloud9Name, setCloud9Name] = useState("");

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    const storedCloud9Name = localStorage.getItem("cloud9Name");
    console.log(storedCloud9Name);
    if (storedCloud9Name == null) {
      localStorage.setItem("cloud9Name", randomName);
      let storedCloud9Name = localStorage.getItem("cloud9Name");
      setCloud9Name(storedCloud9Name!);
    } else {
      setCloud9Name(storedCloud9Name);
    }
  }, []);

  const markdown = `
  # Access to Cloud9
## What is AWS Cloud9?

AWS Cloud9 is an integrated development environment, or IDE. 

The AWS Cloud9 IDE offers a rich code-editing experience with support for several programming languages and runtime debuggers, and a built-in terminal. It contains a collection of tools that you use to code, build, run, test, and debug software, and helps you release software to the cloud.

You access the AWS Cloud9 IDE through a web browser. You can configure the IDE to your preferences. You can switch color themes, bind shortcut keys, enable programming language-specific syntax coloring and code formatting, and more.

The following diagram shows a high-level overview of how AWS Cloud9 works.

**Use the AWS Cloud9 IDE, running in a web browser on your local computer, to interact with your AWS Cloud9 environment.**

Using the AWS Cloud9 IDE, you can:

- Store your project's files locally on the instance or server.
- Clone a remote code repository—such as a repo in AWS CodeCommit—into your environment.
- Work with a combination of local and cloned files in the environment.

...and today you use it to test your API!

Connect to Cloud9 by browsing to https://console.aws.amazon.com/cloud9/ 

In the console make sure you are in the right Region (top right) and search for the button Create environment.

**Click on the button create environment **

Next:

- Give a name to your instance '${cloud9Name}'
- Configure the options of your Cloud9 instance

**Choose your options**

- Review the options and choose Create!

After a few minutes your Cloud 9 environment is created!

**Cloud9 logo will show up**
The creation of the instance can take a little longer than the time-out on the page, a refresh of the page should provide access

A few more configuration steps:

- Close the Welcome Screen

**Close the welcome screen**

- Prepare a terminal in full screen

**Click the X**

Your terminal in Cloud9 is ready for your API testing!

**Cloud9 terminal**
You can proceed to test your API.`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/8">Next </NavLink>
      <NavLink to="/6">Previous</NavLink>
    </div>
  );
};
