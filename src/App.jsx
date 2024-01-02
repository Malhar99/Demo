// 1. Create a simple textarea and add necessary styling.
// 2. There should be a customisable character count limit to your textarea.
// 3. Show this limit below the textarea. Improvement - You can add progress circle showing the count.
// 4. If characters goes beyond the limit, highlight them, decrease the count to negative value and disable the submit button.
// 5. You can also add warnings when only the 10% character limit is remaining.
// 6. If a user is adding symbols such as @ or # made them as a link with relevant href.
// 7. After a submit button, display that paragraph.

import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import parse from "html-react-parser";

function formatText(text) {
  // Regular expression to match '@username' pattern
  const mentionRegex = /@(\w+)/g;
  const textWithMentions = text.replace(
    mentionRegex,
    '<a href="https://twitter.com/$1">@$1</a>'
  );

  // Regular expression to match '#hashtag' pattern
  const hashtagRegex = /#(\w+)/g;
  const textWithHashtags = textWithMentions.replace(
    hashtagRegex,
    '<a href="https://twitter.com/hashtag/$1">#$1</a>'
  );

  return textWithHashtags;
}

function App() {
  const [text, setText] = useState("");
  const [customLimit, setCustomLimit] = useState(100);
  const [onSubmit, setOnSubmit] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [warning, setWarning] = useState("");

  const onChange = (e) => {
    const inputText = e.target.value;
    const formattedText = inputText;

    setText(formattedText);

    const charLength = formattedText.length;
    setCharCount(charLength);

    if (charLength >= customLimit * 0.9) {
      setWarning("Only the 10% character limit is remaining");
    } else {
      setWarning("");
    }

    setOnSubmit(false);
  };

  const handleSubmit = () => {
    setOnSubmit(true);
  };

  return (
    <Container>
      <div className="mt-5">
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Custom TextArea Limit"
          className="mb-2"
        >
          <Form.Control
            type="text"
            placeholder="Set Custom TextArea Limit"
            onChange={(e) => setCustomLimit(e.target.value)}
            value={customLimit}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={(e) => onChange(e)}
            value={text}
          />
        </FloatingLabel>
        <Row className="mt-2">
          <Col xs={6} className="text-start">
            <small className="text-warning">{warning}</small>
          </Col>
          <Col xs={6} className="text-end">
            <p>
              <small
                className={
                  charCount > customLimit ? "text-danger" : "text-dark"
                }
              >
                {charCount}
              </small>{" "}
              /<small> {customLimit}</small>
            </p>
          </Col>
        </Row>
      </div>
      <Button
        variant="success"
        onClick={handleSubmit}
        disabled={!text || charCount > customLimit}
      >
        Submit
      </Button>
      {onSubmit && <p className="read-the-docs">{parse(formatText(text))}</p>}
    </Container>
  );
}

export default App;
