import './JsonViewer.css'

interface JsonViewerProps<T> {
  data: T,
  path?: string,
  onKeyClick: (path: string) => void
}

const renderJson = (
  obj: unknown,
  basePath: string,
  onKeyClick: (path: string) => void
): React.ReactNode => {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return (
        <ul className="res_list">
          {obj.map((item, index) => (
            <li key={index}>
              <span>{"{"}</span>
              {renderJson(item, `${basePath}[${index}]`, onKeyClick)}
              <span>{"}"}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      const keys = Object.keys(obj);
      return (
        <ul className="res_list">
          {keys.map((key) => {
            const value = obj[key as keyof typeof obj];
            return (
              <li key={key}>
                <button
                  className="res_key"
                  onClick={() => onKeyClick(`${basePath}.${key}`)}
                >
                  {key}
                </button>
                : {renderJson(value, `${basePath}.${key}`, onKeyClick)}
              </li>
            );
          })}
        </ul>
      );
    }
  } else {
    return <span>{JSON.stringify(obj)}</span>;
  }
};

const JsonViewer = <T,>({
  data,
  path = "res",
  onKeyClick,
}: JsonViewerProps<T>) => {
  return (
    <div className="res_container">{renderJson(data, path, onKeyClick)}</div>
  );
};

export default JsonViewer;