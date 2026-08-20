import { Component } from "react";
import { Link, useLocation } from "react-router";

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pathname !== this.props.pathname && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-5 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-brown">
            Let’s open that page again
          </h1>
          <p className="mt-3 text-sm text-dark-brown max-w-md">
            The catalog is ready on this site. Use the links below — no loading
            from an external server.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#5d3a26] text-white text-[11px] uppercase tracking-[0.16em] font-bold"
            >
              View All Products
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-dark-brown text-dark-brown text-[11px] uppercase tracking-[0.16em] font-bold"
            >
              About Us
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-dark-brown text-dark-brown text-[11px] uppercase tracking-[0.16em] font-bold"
            >
              Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ErrorBoundary({ children }) {
  const { pathname } = useLocation();
  return <Boundary pathname={pathname}>{children}</Boundary>;
}

export default ErrorBoundary;
