import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function BarChart({ data }) {
  const svgRef = useRef();
  const tooltipRef = useRef(); // Tooltip container

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    // Clear previous chart
    svg.selectAll("*").remove();

    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.amount)])
      .range([height - margin.bottom, margin.top]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.amount))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.amount))
      .attr('fill', 'steelblue')
      .on("mouseover", function(event, d) {
        // Show tooltip on hover
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', 'orange');

        const [x, y] = d3.pointer(event);
        tooltip
          .style("visibility", "visible")
          .style("left", `${x + 50}px`)
          .style("top", `${y + 20}px`)
          .html(`<strong>${d.category}</strong><br/>Description: ${d.description}<br/>Amount: $${d.amount}`);
      })
      .on("mousemove", function(event) {
        const [x, y] = d3.pointer(event);
        tooltip
          .style("left", `${x + 50}px`)
          .style("top", `${y + 20}px`);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill', 'steelblue');
        
        tooltip.style("visibility", "hidden");
      });

  }, [data]);

  return (
    <>
      <svg ref={svgRef} width={500} height={300}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'lightgray',
          padding: '5px',
          borderRadius: '5px',
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
      />
    </>
  );
}
