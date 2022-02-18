import * as React from "react";
import PropTypes from "prop-types";
import { init, getInstanceByDom, registerMap } from "echarts";
import reactElementToJSXString from "react-element-to-jsx-string";

// from https://dev.to/maneetgoyal/using-apache-echarts-with-react-and-typescript-353k

const ReactEChart = ({ option, style, settings, loading, theme, svg }) => {
  const chartRef = React.useRef();

  React.useEffect(() => {
    // Initialize chart
    let chart;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    if (window) {
      window.addEventListener("resize", resizeChart);
    }
    if (svg) {
      registerMap("chartsvg", {
        svg: reactElementToJSXString(svg()),
      });
    }

    // Return cleanup function
    return () => {
      chart?.dispose();
      if (window) {
        window.removeEventListener("resize", resizeChart);
      }
    };
  }, [theme]);

  React.useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  React.useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100px", ...style }} />
  );
};

ReactEChart.propTypes = {
  option: PropTypes.object.isRequired,
  style: PropTypes.object,
  settings: PropTypes.object,
  loading: PropTypes.bool,
  theme: PropTypes.string, // "light" | "dark"
};

export default ReactEChart;
