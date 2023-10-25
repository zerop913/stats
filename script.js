document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const columnStats = {};

      data.forEach((entry) => {
        entry.forEach((column) => {
          const columnName = column[0];
          const columnValue = column[1];

          if (!columnValue) {
            return;
          }

          if (!columnStats[columnName]) {
            columnStats[columnName] = {};
          }

          if (columnValue in columnStats[columnName]) {
            columnStats[columnName][columnValue]++;
          } else {
            columnStats[columnName][columnValue] = 1;
          }
        });
      });

      const statsContainer = document.getElementById("stats");

      for (const columnName in columnStats) {
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("p-4", "bg-gray-200", "rounded", "mb-4");

        const title = document.createElement("h2");
        title.classList.add(
          "text-lg",
          "font-semibold",
          "mb-2",
          "cursor-pointer"
        );
        title.innerText = columnName;
        columnDiv.appendChild(title);

        const listContainer = document.createElement("div");
        listContainer.classList.add("hidden", "divide-y", "divide-gray-400");
        columnDiv.appendChild(listContainer);

        title.addEventListener("click", function () {
          listContainer.classList.toggle("hidden");
        });

        const columnData = columnStats[columnName];
        const total = Object.values(columnData).reduce((a, b) => a + b, 0);

        for (const value in columnData) {
          const percentage = ((columnData[value] / total) * 100).toFixed(2);
          const row = document.createElement("div");
          row.classList.add("flex", "justify-between", "items-center", "py-2");
          const label = document.createElement("span");
          label.classList.add("text-gray-700");
          label.innerText = `${value}:`;
          const percentageText = document.createElement("span");
          percentageText.classList.add("text-blue-500", "font-medium");
          percentageText.innerText = `${percentage}%`;
          row.appendChild(label);
          row.appendChild(percentageText);
          listContainer.appendChild(row);
        }

        statsContainer.appendChild(columnDiv);
      }
    });
});
