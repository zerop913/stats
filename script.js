document.addEventListener("DOMContentLoaded", function () {
  fetch("data.php")
    .then((response) => response.json())
    .then((data) => {
      const statsContainer = document.getElementById("stats");

      for (const columnName in data) {
        const columnStats = data[columnName];
        const total = Object.values(columnStats).reduce((a, b) => a + b, 0);

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

        for (const value in columnStats) {
          const percentage = ((columnStats[value] / total) * 100).toFixed(2);
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
