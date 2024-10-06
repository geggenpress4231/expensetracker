import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function PieChart({ data }) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    svg.selectAll("*").remove();

    // Group expenses by category and sum their amounts
    const categoryData = Array.from(d3.rollup(data, v => d3.sum(v, d => d.amount), d => d.category));

    // Create pie chart layout
    const pie = d3.pie()
      .value(d => d[1])
      .sort(null);

    const arc = d3.arc()
      .innerRadius(50)
      .outerRadius(radius);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(pie(categoryData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this).transition().duration(200).attr('opacity', 0.7);
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.data[0]}</strong><br/>Amount: $${d.data[1].toFixed(2)}`);
      })
      .on('mousemove', function(event) {
        const svgPosition = svgRef.current.getBoundingClientRect(); // Get the position of the SVG relative to the viewport
        const [x, y] = d3.pointer(event); // Use d3.pointer for relative position within the SVG
        tooltip
          .style("left", `${x + svgPosition.left + 10}px`)  // Adjust tooltip position relative to the SVG container
          .style("top", `${y + svgPosition.top + 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this).transition().duration(200).attr('opacity', 1);
        tooltip.style("visibility", "hidden");
      });

    g.selectAll('text')
      .data(pie(categoryData))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'black')
      .text(d => d.data[0]);

  }, [data]);

  return (
    <>
      <svg ref={svgRef} width={300} height={300}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px',
          borderRadius: '5px',
          pointerEvents: 'none',
          visibility: 'hidden',
          fontSize: '12px',
        }}
      />
    </>
  );
}
