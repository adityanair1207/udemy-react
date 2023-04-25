import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1 style={{ color: "red" }}>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
