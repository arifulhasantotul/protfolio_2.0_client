import ReactMarkdown from "react-markdown";

const MarkdownViewer = ({ richText }) => {
  return <ReactMarkdown>{richText}</ReactMarkdown>;
};

export default MarkdownViewer;
