const mainText = document.getElementById("main-text");
const resultsContainer = document.getElementById("results-container");

const count = () => {
  resultsContainer.innerHTML = "<i>Calculating...</i>";

  let wordArray = mainText.value
    .replace(
      /[\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥]/g,
      ""
    )
    .split(" ");
  let charCounter = 0;
  wordArray = wordArray
    .filter((item) => item.trim() !== "") // Filter empty keys
    .map((item) => {
      charCounter += item.trim().length;
      return item.trim();
    }); //Trims spaces from all words

  let wordSet = new Set(wordArray);
  const wordCounter = wordSet.size;

  wordSet = { ...wordSet }; //Converts the set into a plain object
  let resultsText = "";

  resultsText += `<p class='top-3-title'>
                    Character count (without spaces): ${charCounter}
                  </p>
                  <p class='top-3-title'>
                    Word count: ${wordCounter}
                  </p>
                  <br/>`;

  resultsText += "<p class='top-3-title'>TOP 3: </p>";
  wordArray.map((item) => {
    wordSet[item] = wordSet[item] ? wordSet[item] + 1 : 1;
  });
  const orderedSet = Object.keys(wordSet).sort(function (a, b) {
    return wordSet[b] - wordSet[a];
  });

  let counter = 0;
  for (const k of orderedSet) {
    counter++;

    resultsText += `<div class='value-container ${counter <= 3 ? "top-3" : ""}'>
        <p class='key ${counter <= 3 ? "" : "searchable"}'>${k}</p>
        <p class='value'>${wordSet[k]}</p>
      </div>
      ${
        counter === 3
          ? "<br/><input type='text' class='search-box' placeholder='Search word...' oninput='search();'/><br/>"
          : ""
      }`;
  }

  resultsContainer.innerHTML = resultsText;
};

const search = () => {
  const text = document.querySelector(".search-box").value.trim();
  const searchableArray = Array.from(document.querySelectorAll(".searchable"));
  searchableArray.forEach((item) => {
    item.parentNode.style.display = "inline-block";
  }); //Cleans status before search
  searchableArray.forEach((item) => {
    if (
      (item.innerHTML.contains && !item.innerHTML.contains(text)) || //Olds Browsers
      (item.innerHTML.includes && !item.innerHTML.includes(text)) // New standard for Firefox and Chrome
    ) {
      item.parentNode.style.display = "none";
    }
  });
};
