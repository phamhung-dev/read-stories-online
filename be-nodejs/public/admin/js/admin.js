// Graph
// var ctx = document.getElementById("myChart");

// var myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     datasets: [
//       {
//         data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
//         lineTension: 0,
//         backgroundColor: "transparent",
//         borderColor: "#007bff",
//         borderWidth: 4,
//         pointBackgroundColor: "#007bff",
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: false,
//           },
//         },
//       ],
//     },
//     legend: {
//       display: false,
//     },
//   },
// });

//change active sidebarMenu a tag
var sidebarMenu = document.getElementById('sidebarMenu');
var sidebarMenuItems = sidebarMenu.getElementsByTagName('a');
for (var i = 0; i < sidebarMenuItems.length; i++) {
    if (sidebarMenuItems[i].href === window.location.href) {
        sidebarMenuItems[i].classList.add('active');
    }
}