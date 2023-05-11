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

export const Page8 = () => {
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
  To make sure that your API is working, you can use 'curl', a command line tool and library for transferring data with URLs. Here are the steps to follow:

1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway/.
2. Choose your API.
3. Note your API's invoke URL. It appears under Invoke URL on the Details page. After you create your API, the console shows your API's invoke URL. The full URL looks like this: https://abcdef123.execute-api.eu-west-1.amazonaws.com. Copy your API's invoke URL.

To create or update an item:

1. Connect to Cloud9 by browsing to https://console.aws.amazon.com/cloud9/.
2. Open the Cloud9 IDE.
3. Replace "https://abcdef123.execute-api.eu-west-1.amazonaws.com" with your Invoke URL in the following command to set a variable with the Invoke URL:

   ~~~
   # DO NOT COPY THIS!!!
   # Replace URL with the Invoke URL above
   export INVOKE_URL="https://abcdef123.execute-api.eu-west-1.amazonaws.com"
   ~~~

4. Create or update an item using the following command. The command includes a request body with the item's ID, price, and name:

   ~~~
   curl -X "PUT" -H "Content-Type: application/json" -d "{
       \"id\": \"abcdef234\",
       \"price\": 12345,
       \"name\": \"myitem\"
   }" $INVOKE_URL/items
   ~~~

   Challenge: can you find the entry in DynamoDB?

5. Sign in to the DynamoDB console at https://console.aws.amazon.com/DynamoDB/.
6. Select Tables in the left pane.
7. Select your table.
8. Select Items tab.
9. Confirm data from your PUT from previous step.

To get all items:

Use the following command to list all items.

~~~
curl -s $INVOKE_URL/items | js-beautify
~~~

Confirm:

~~~
{
    "Items": [{
        "price": 12345,
        "id": "abcdef234",
        "name": "myitem"
    }],
    "Count": 1,
    "ScannedCount": 1
}
~~~

To get an item:

Use the following command to get an item by its ID.

~~~
curl -s $INVOKE_URL/items/abcdef234 | js-beautify
~~~

Confirm:

~~~
{
    "Item": {
        "price": 12345,
        "id": "abcdef234",
        "name": "myitem"
    }
}
~~~

To delete an item:

Use the following command to delete an item.

~~~
curl -X "DELETE" $INVOKE_URL/items/abcdef234
~~~

Confirm:

~~~
"Deleted item abcdef234"
~~~

Get all items to verify that the item was deleted.

~~~
curl -s $INVOKE_URL/items | js-beautify
~~~

Confirm:

~~~
{
    "Items": [],
    "Count": 0,
    "ScannedCount": 0
}
~~~`;

  return (
    <div className="markdown-body">
      <ReactMarkdown children={markdown}></ReactMarkdown>
      <NavLink to="/9">Next </NavLink>
      <NavLink to="/7">Previous</NavLink>
    </div>
  );
};
