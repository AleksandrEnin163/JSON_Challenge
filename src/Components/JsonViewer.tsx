import './JsonViewer.css'

interface JsonViewerProps<T> {
  data: T,
  path?: string,
  onKeyClick: (path: string) => void
}

const JsonViewer = <T,>({ data, path = 'res', onKeyClick }: JsonViewerProps<T>) => {
    const renderJson = (obj: any, basePath: string): JSX.Element | JSX.Element[] => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          return (
            <ul className='res_list'>
              {obj.map((item, index) => (
                <li key={index}>
                  <span>{'{'}</span>
                  {renderJson(item, `${basePath}[${index}]`)}
                  <span>{'}'}</span>
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <ul className='res_list'>
              {Object.keys(obj).map((key) => (
                <li key={key}>
                  <button
                    className='res_key'
                    onClick={() => onKeyClick(`${basePath}.${key}`)}
                  >
                    {key}
                  </button>
                  : {renderJson(obj[key], `${basePath}.${key}`)}
                </li>
              ))}
            </ul>
          );
        }
      } else {
        return <span>{JSON.stringify(obj)}</span>;
      }
    };
  
    return <div className='res_container'>{renderJson(data, path)}</div>;
  };
export default JsonViewer