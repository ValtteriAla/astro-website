import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, description, link, className, image={src: ""}} = this.props

    let defaultClass = "flex flex-col p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] "
    
    if (className) {
        defaultClass += `${className}`
    }
    
    return (
      <div className={defaultClass}>
        {image.src && (<img
          className="w-full max-h-48 rounded-t-xl"
          src={image.src}
          alt="Image Description"
        />)}

        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
             {description}
          </p>

          {link && (<a
            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href={link.href}
          >
            {link.name}
          </a>)}

        </div>
      </div>
    );
  }
}
export default App;
