import PropTypes from "prop-types";
function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Container;
