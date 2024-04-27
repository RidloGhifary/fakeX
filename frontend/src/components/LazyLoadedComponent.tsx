import React, { useEffect, useRef, useState } from "react";

interface LazyLoadedComponentProps {
  children: React.ReactNode;
}

const LazyLoadedComponent: React.FC<LazyLoadedComponentProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return <div ref={componentRef}>{isVisible && children}</div>;
};

export default LazyLoadedComponent;
