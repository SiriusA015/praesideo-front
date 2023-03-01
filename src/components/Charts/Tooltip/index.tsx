import { Chart, TooltipModel, FontSpec } from "chart.js";
import { toFont } from "chart.js/helpers";
import { _DeepPartialObject } from "chart.js/types/utils";

type ChartToopltipProps = {
  padding: number;
  background: string;
  getElement: (
    body: string[],
    index: number,
    tooltip: TooltipModel<"line">
  ) => string;
};

// https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
export const ChartToopltip =
  ({ padding, background, getElement }: ChartToopltipProps) =>
  (context: { tooltip: TooltipModel<"line">, chart: Chart }) => {
    // Tooltip Element
    let tooltipEl = document.getElementById("chartjs-tooltip");

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove("above", "below", "no-transform");

    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add("no-transform");
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(
        (bodyItem: { lines: string[] }) => bodyItem.lines
      );

      let innerHtml = "<thead>";

      titleLines.forEach((title: string) => {
        innerHtml += "<tr><th>" + title + "</th></tr>";
      });
      innerHtml += "</thead><tbody>";

      bodyLines.forEach((body: string[], i: number) => {
        const colors = tooltipModel.labelColors[i];
        let style = "background:" + colors.backgroundColor;
        style += "; border-color:" + colors.borderColor;
        style += "; border-width: 2px";
        const span = '<span style="' + style + '"></span>';
        innerHtml +=
          "<tr><td>" + span + getElement(body, i, tooltipModel) + "</td></tr>";
      });
      innerHtml += "</tbody>";

      let tableRoot = tooltipEl.querySelector("table");
      if (tableRoot) {
        tableRoot.innerHTML = innerHtml;
      }
    }
    
    const position = context.chart.canvas.getBoundingClientRect();
    const bodyFont = toFont(tooltipModel.options.bodyFont as Partial<FontSpec>);

    // Display, position, and set styles for font
    const styles = {
      position: "absolute",
      top: position.top + window.pageYOffset + tooltipModel.caretY + "px",
      left: position.left + window.pageXOffset + tooltipModel.caretX + "px",
      padding: padding + "px " + padding + "px",
      opacity: "1",
      transition: "all 0.5s ease",
      ["transition-property"]: "left, top, opacity",
      background: background,
      color: "white",
      ["border-radius"]: "3px",
      font: bodyFont.string,
      ["pointer-events"]: "none",
    };

    tooltipEl.setAttribute(
      "style",
      Object.entries(styles)
        .map(([k, v]) => `${k}:${v}`)
        .join(";")
    );
  };
