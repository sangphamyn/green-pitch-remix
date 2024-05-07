import { Link } from "react-router-dom";

function Breadcrumb({ paths }) {
  return (
    <div className="container mx-auto">
      <div className="text-sm breadcrumbs">
        <ul className="breadcrumb">
          {paths.map((path, index) => (
            <li key={index}>
              <Link to={path.url}>{path.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
