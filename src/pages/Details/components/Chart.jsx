import CanvasJSReact from "@canvasjs/react-charts"

var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

export const Chart = ({ data = [], title = "" }) => {
  const options = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      title: "Intervalo",
      valueFormatString: "HH:mm",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Cotización",
      valueFormatString: "##0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return CanvasJS.formatNumber(e.value, "##0.00")
        },
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "DD MMM HH:mm",
        yValueFormatString: "##0.00",
        dataPoints: data,
      },
    ],
  }

  return (
    <>
      {title && <h1 className='my-4 font-bold text-xl text-slate-700'>{title}</h1>}
      <CanvasJSChart options={options} />
    </>
  )
}
