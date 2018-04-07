function getHighstores(mode, size) {
  const allScores = window.localStorage;
  const filteredScores = [];
  Object.keys(allScores).forEach(function(id) {
    try {
      const parsed = JSON.parse(allScores[id]);
      if (parsed.mode == mode && parsed.size == size) {
        filteredScores.push(parsed);
      }
    } catch (error) {}
  });

  filteredScores.sort(function(a, b) {
    return a.result - b.result;
  });
  return filteredScores;
}

function updateHighstore() {
  const mode = readTypeOfElements();
  const size = readNumberOfElements();
  const highscores = getHighstores(mode, size);

  const data = document.getElementById("highscores-data");
  if (highscores.length > 0) {
    let list = '<ol>';
    highscores.forEach(function(element) {
      list += '<li>';
      list += '<span>' + element.name + ': </span>';
      list += '<span>' + element.result + '</span>';
      list += '</li>';
    });
    list += '</ol>';
    data.innerHTML = list;
  } else {
    const message = '<h3>There is no any records here yet</h3>';
    data.innerHTML = message;
  }
}

function initHighstore() {
  updateHighstore();
  document.getElementsByName("difficulty").forEach(function(element) {
    element.addEventListener("change", function(event) {
      updateHighstore();
    });
  });
  document.getElementsByName("mode").forEach(function(element) {
    element.addEventListener("change", function(event) {
      updateHighstore();
    });
  });
}

initHighstore();
