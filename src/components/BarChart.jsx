import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function BarChart({ data }) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;  // If no data, stop rendering the chart

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    // Clear previous chart
    svg.selectAll("*").remove();

    // Group expenses by category and aggregate amounts
    const categories = Array.from(new Set(data.map(d => d.category)));
    const stackedData = categories.map(category => ({
      category,
      totalAmount: d3.sum(data.filter(d => d.category === category), d => d.amount),
      expenses: data.filter(d => d.category === category),  // Include individual expenses
    }));

    // Scales
    const xScale = d3.scaleBand()
      .domain(stackedData.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stackedData, d => d.totalAmount)])  // Use totalAmount for each category
      .range([height - margin.bottom, margin.top]);

    const barColor = '#4682B4';  // Default color for bars

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")  // Center-align the text
      .style("font-size", "12px")      // Adjust font size
      .attr("dy", "1em");              // Add space between axis and labels

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Bind data
    const categoryGroups = svg.selectAll('.category')
      .data(stackedData);

    // Handle Enter + Update
    const bars = categoryGroups.enter()
      .append('g')
      .attr('class', 'category')
      .attr('transform', d => `translate(${xScale(d.category)}, 0)`)
      .merge(categoryGroups)
      .selectAll('rect')
      .data(d => d.expenses);

    // Enter new elements
    bars.enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => {
        const previousExpenses = nodes.slice(0, i).map(n => d3.select(n).datum().amount);
        const cumulativeSum = d3.sum(previousExpenses);
        return yScale(cumulativeSum + d.amount);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.amount))
      .attr('fill', barColor)  // Default color for bars
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(100).attr('fill', 'orange');  // Change to yellow on hover
        const [x, y] = d3.pointer(event, svg.node());
        tooltip
          .style("visibility", "visible")
          .style("left", `${x + margin.left}px`)
          .style("top", `${y + margin.top}px`)
          .html(`<strong>${d.category}</strong><br/>Description: ${d.description}<br/>Amount: $${d.amount}`);
      })
      .on("mousemove", function(event) {
        const [x, y] = d3.pointer(event, svg.node());
        tooltip.style("left", `${x + margin.left}px`).style("top", `${y + margin.top}px`);
      })
      .on("mouseout", function() {
        d3.select(this).transition().duration(100).attr('fill', barColor);  // Revert color on mouseout
        tooltip.style("visibility", "hidden");
      });

    // Remove elements that are no longer in the data
    bars.exit().remove();

  }, [data]);

  // Fallback UI when there is no data
  if (data.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '16px', color: 'gray' }}>No data available to display.</p>;
  }

  return (
    <>
      <svg ref={svgRef} width={600} height={400}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'lightgray',
          padding: '5px',
          borderRadius: '5px',
          pointerEvents: 'none',
          visibility: 'hidden',
          fontSize: '12px',
        }}
      />
    </>
  );
}
