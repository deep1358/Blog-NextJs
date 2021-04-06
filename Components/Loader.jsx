const Loader = ({ top }) => {
  return (
    <div className="cssload-container">
      <div className="cssload-whirlpool"></div>
      <style jsx>
        {`
          .cssload-container {
            top: ${top} !important;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
